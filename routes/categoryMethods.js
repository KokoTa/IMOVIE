let Category = require('../model/category');

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
	}
}