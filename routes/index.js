var express = require('express');
var router = express.Router();

var movieMethods = require('./movieMethods');
var userMethods = require('./userMethods');
var adminLive = require('./adminLive'); // 用户检测
var adminPower = require('./adminPower'); // 权限控制
var commentMethods = require('./commentMethods');

/* GET home page. */
// 主页
router.get('/', movieMethods.getIndex);
// 详情页
router.get('/movie/:id', movieMethods.detail);
// 录入页
router.get('/admin/movie', adminLive.check, adminPower.check, movieMethods.addMovie);
// 提交
router.post('/admin/movie/new', adminLive.check, adminPower.check, movieMethods.submit);
// 更新
router.get('/admin/update/:id', adminLive.check, adminPower.check, movieMethods.update);
// 列表页
router.get('/admin/movie/list', adminLive.check, adminPower.check, movieMethods.getList);
// 删除
router.delete('/admin/movie/list', adminLive.check, adminPower.check, movieMethods.delete);

// 注册
router.post('/user/signup', userMethods.signup);
// 用户列表页
router.get('/user/userlist', adminLive.check, adminPower.check, userMethods.getList);
// 登录
router.post('/user/signin', userMethods.signin);
// 登出
router.get('/logout', userMethods.logout);

// 发表评论
router.post('/user/comment', adminLive.check, commentMethods.submit);

module.exports = router;
