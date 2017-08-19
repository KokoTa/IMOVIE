var _ = require('underscore'); // 工具函数集
var User = require('../model/user');

module.exports = {
	signup: function(req, res) {
		let user = req.body;
		let _user = new User(user);

		User.find({name: user.name}, function(err, user) {
			if(err) return err;
			if(user.length) { // user返回一个数组
				console.log('注册失败');
				res.redirect('/');
			} else {
				_user.save(function(err, user) {
					if(err) return err;
					req.session.user = user;
					console.log('注册成功');
					res.redirect('/');
				})
			}
		})
	},
	getList: function(req, res, next) {
		User.fetch(function(err, users) {
			if(err) return err;
	  	res.render('userlist', {
	  		title: '用户列表页',
	  		users: users
	  	});
		});
	},
	signin: function(req, res) {
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
	},
	logout: function(req, res) {
		delete req.session.user;
		console.log('登出成功');
		res.redirect('/');
	}
}