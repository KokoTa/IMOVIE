var Movie = require('../model/movie');
var Comment = require('../model/comment');
var Category = require('../model/category');
var _ = require('underscore'); // 工具函数集

var fs = require('fs');
var path = require('path'); 

module.exports = {
	getIndex: function(req, res, next) {
		Category.find({})
			.populate({
				path: 'movies',
				options: {
					limit: 5
				}
			})
			.exec(function(err, categories) {
				if(err) console.log(err);
				res.render('index', {
					title: '首页',
					categories: categories
				})
			});
	},
	detail: function(req, res, next) {
		var id = req.params.id

		Movie.update({_id: id}, {$inc: {pv: 1}}, function(err, info) {
			if(err) console.log(err);
			console.log(info);
		});

		Movie.findById(id, function(err, movie) {
			Comment.find({movie: id})
						.populate('from', 'name') // populate意为填充：from通过ObjectId查询关联的表，随后from被替换为一个结果对象{_id:xx,name:xx}
						.populate('reply.from reply.to', 'name')
						.exec(function(err, comments) {
					  	res.render('detail', {
					  		title: '详情页',
					  		movie: movie,
					  		comments: comments
					  	});
						})
		});
	},
	addMovie: function(req, res, next) {
		Category.find({}, function(err, categories) {
			if(err) console.log(err);
		  res.render('admin', {
		  	title: '录入页',
		  	movie: {},
		  	categories: categories
		  });
		})
	},
	submit: function(req, res, next) {
		var id = req.body._id;
		var movieObj = req.body;
		var _movie;

		if(req.poster) movieObj.poster = req.poster;

		if(id) { // 更新电影
			Movie.findById(id, function(err, movie) {
				if(err) console.log(err);
				_movie = _.extend(movie, movieObj); // 合并对象
				_movie.save(function(err, movie) { // 覆盖记录
					if(err) console.log(err);
					res.redirect('/movie/' + movie._id)
				});
			});
			// 替代方案
			// Model.findOneAndUpdate([conditions], [update], [callback])
		} else { // 添加新电影
			_movie = new Movie(movieObj);
			_movie.save(function(err, movie) {
				if(err) console.log(err);
				Category.findById(movie.category, function(err, category) { // 分类储存在电影里后，电影也储存在分类里，双向绑定
					category.movies.push(movie._id);
					category.save(function(err, category) {
						if(err) console.log(err);
						res.redirect('/movie/' + movie._id)
					});
				});

			});
		}
	},
	update: function(req, res, next) {
		var id = req.params.id;
		if(id) {
			Movie.findById(id, function(err, movie) {
				Category.find({}, function(err, categories) {
					res.render('admin', {
						movie: movie,
						categories: categories
					})
				})
			})
		}
	},
	getList: function(req, res, next) {
		Movie.fetch(function(err, movies) {
			if(err) console.log(err);
	  	res.render('list', {
	  		title: '列表页',
	  		movies: movies
	  	});
		});
	},
	delete: function(req, res, next) {
		let id = req.query.id;
		if(id) {
			Movie.remove({_id:id}, function(err, movie) {
				if(err) {
					console.log(err);
				} else {
					res.json({success: 1})
				}
			})
		}
	},
	savePoster: function(req, res, next) {
		var posterData = req.files.uploadPoster;
		var filePath = posterData.path;
		var fileName = posterData.originalFilename;

		if(fileName) { // 如果上传了文件就执行
			fs.readFile(filePath, function(err, data) {
				var timeStamp = Date.now();
				var type = posterData.type.split('/')[1];
				var poster = timeStamp + '.' + type;
				var newPath = path.join(__dirname, '../public/upload/' + poster);

				fs.writeFile(newPath, data, function(err) {
					req.poster = '/upload/' + poster;
					next();
				})
			})
		} else {
			next();
		}
	}
}