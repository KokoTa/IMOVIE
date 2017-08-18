var Movie = require('../model/movie');

module.exports = {
	getIndex: function(req, res, next) {
		Movie.fetch(function(err, movies) {
			if(err) return err;
	  	res.render('index', {
	  		title: '首页',
	  		movies: movies
	  	});
		});
	},
	detail: function(req, res, next) {
		var id = req.params.id
		Movie.findById(id, function(err, movie) {
	  	res.render('detail', {
	  		title: '详情页',
	  		movie: movie
	  	});
		});
	},
	addMovie: function(req, res, next) {
	  res.render('admin', {
	  	title: '录入页',
	  	movie: {
	  		title: '',
	  		doctor: '',
	  		country: '',
	  		flash: '',
	  		poster: '',
	  		year: '',
	  		summary: '',
	  		language: '',
	  	}
	  });
	},
	submit: function(req, res, next) {
		var id = req.body._id;
		var movieObj = req.body;
		var _movie;

		if(id !== 'undefined') {
			Movie.findById(id, function(err, movie) {
				if(err) return err;
				_movie = _.extend(movie, movieObj); // 合并对象
				_movie.save(function(err, movie) { // 覆盖记录
					if(err) return err;
					res.redirect('/movie/' + movie._id)
				});
			});
			// 替代方案
			// Model.findOneAndUpdate([conditions], [update], [callback])
		} else {
			_movie = new Movie({
				title: movieObj.title,
				doctor: movieObj.doctor,
				country: movieObj.country,
				flash: movieObj.flash,
				poster: movieObj.poster,
				year: movieObj.year,
				summary: movieObj.summary,
				language: movieObj.language
			});
			_movie.save(function(err, movie) {
				if(err) return err;
				res.redirect('/movie/' + movie._id)
			});
		}
	},
	update: function(req, res, next) {
		var id = req.params.id;
		if(id) {
			Movie.findById(id, function(err, movie) {
				res.render('admin', {
					movie: movie
				})
			})
		}
	},
	getList: function(req, res, next) {
		Movie.fetch(function(err, movies) {
			if(err) return err;
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
					return err;
				} else {
					res.json({success: 1})
				}
			})
		}
	}
}