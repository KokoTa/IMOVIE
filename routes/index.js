var express = require('express');
var router = express.Router();
var Movie = require('../model/movie');
var _ = require('underscore'); // 工具函数集
var User = require('../model/user');

/* GET home page. */
// 主页
router.get('/', function(req, res, next) {
	Movie.fetch(function(err, movies) {
		if(err) return err;
  	res.render('index', {
  		title: '首页',
  		movies: movies
  	});
	});
});

// 详情页
router.get('/movie/:id', function(req, res, next) {
	var id = req.params.id
	Movie.findById(id, function(err, movie) {
  	res.render('detail', {
  		title: '详情页',
  		movie: movie
  	});
	});
});

// 录入页
router.get('/admin/movie', function(req, res, next) {
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
});

// 提交
router.post('/admin/movie/new', function(req, res) {
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
});

// 更新
router.get('/admin/update/:id', function(req, res) {
	var id = req.params.id;
	if(id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				movie: movie
			})
		})
	}
})

// 列表页
router.get('/admin/list', function(req, res, next) {
	Movie.fetch(function(err, movies) {
		if(err) return err;
  	res.render('list', {
  		title: '列表页',
  		movies: movies
  	});
	});
});

// 删除
router.delete('/admin/list', function(req, res) {
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
})

// 注册
router.post('/user/signup', function(req, res) {
	let user = req.body;
	let _user = new User(user);

	User.find({name: user.name}, function(err, user) {
		if(err) return err;
		if(user) {
			res.redirect('/');
		} else {
			_user.save(function(err, user) {
				if(err) return err;
				res.redirect('/admin/userlist');
			})
		}
	})
})

// 用户列表页
router.get('/admin/userlist', function(req, res, next) {
	User.fetch(function(err, users) {
		if(err) return err;
  	res.render('userlist', {
  		title: '用户列表页',
  		users: users
  	});
	});
});

// 登录
router.post('/user/signin', function(req, res) {
	let user = req.body;
	let name = user.name;
	let password = user.password;

	User.findOne({name: name}, function(err, user) {
		if(err) return err;
		if(!user) return res.redirect('/');
		user.comparePassword(password, function(err, isMatch) {
			if(err) return err;
			if(isMatch) {
				req.session.user = user;
				console.log('登录成功');
				res.redirect('/');
			} else {
				console.log('登陆失败');
				res.redirect('/');
			}
		})
	})
});

// 登出
router.get('/logout', function(req, res) {
	delete req.session.user;
	console.log('登出成功');
	res.redirect('/');
})

module.exports = router;
