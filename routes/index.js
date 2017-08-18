var express = require('express');
var router = express.Router();

var movieMethods = require('./movieMethods');
var userMethods = require('./userMethods');
var adminPower = require('./adminPower'); // 权限控制

/* GET home page. */
// 主页
router.get('/', movieMethods.getIndex);
// 详情页
router.get('/movie/:id', movieMethods.detail);
// 录入页
router.get('/admin/movie', adminPower.check, movieMethods.addMovie);
// 提交
router.post('/admin/movie/new', adminPower.check, movieMethods.submit);
// 更新
router.get('/admin/update/:id', adminPower.check, movieMethods.update)
// 列表页
router.get('/admin/movie/list', adminPower.check, movieMethods.getList);
// 删除
router.delete('/admin/movie/list', adminPower.check, movieMethods.delete)

// 注册
router.post('/user/signup', userMethods.signup)
// 用户列表页
router.get('/user/userlist', adminPower.check, userMethods.getList);
// 登录
router.post('/user/signin', userMethods.signin);
// 登出
router.get('/logout', userMethods.logout)

module.exports = router;
