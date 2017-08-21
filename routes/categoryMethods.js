let Category = require('../model/category');
let Movie = require('../model/movie'); // 这里只用在搜索电影上

module.exports = {
	new: function(req, res) {
		res.render('categoryAdmin', {
			title: '电影分类录入页'
		})
	},
	submit: function(req, res) {
		var categoryName = req.body.categoryName;

		var category = new Category({
			name: categoryName
		});

		category.save(function(err, category) {
			if(err) console.log(err);
			res.redirect('/admin/movie/categoryList');
		})
	},
	getList: function(req, res) {
		Category.find({})
			.exec(function(err, categories) {
				if(err) console.log(err);
				res.render('categoryList', {
					title: '分类列表页',
					categories: categories
				})
			});
	},
	result: function(req, res) {
		var cat = req.query.cat;
		var index = req.query.index || 0;
		var count = 5;
		var movieName = req.query.movieName;

		if(cat) { // 如果有id就是电影类型搜索， 否则是电影搜索
			Category.findOne({_id: cat})
				.populate({
					path: 'movies',
					select: 'title poster',
					// options: {
					// 	limit: 5,
					// 	skip: i
					// }
				})
				.exec(function(err, category) {
					var currentMovies = category.movies.slice(index*count, (index+1)*count);
					res.render('result', {
						title: '结果列表页',
						movies: currentMovies,
						currentPage: parseInt(index+1, 10),
						totalPage: Math.ceil(category.movies.length/5),
						cat: category._id
					})
				})
		} else {
			Movie.find({title: new RegExp(movieName, 'gi')}, function(err, movies) {
				res.render('result', {
					title: '结果列表页',
					movies: movies
				})
			})
		}
	}
}