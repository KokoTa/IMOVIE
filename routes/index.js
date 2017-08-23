var express = require('express');
var router = express.Router();

var movieMethods = require('./movieMethods');
var userMethods = require('./userMethods');
var adminLive = require('./adminLive'); // 用户检测
var adminPower = require('./adminPower'); // 权限控制
var commentMethods = require('./commentMethods');
var categoryMethods = require('./categoryMethods');

// file middleware
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/* GET home page. */
// 主页
router.get('/', movieMethods.getIndex);
// 详情页
router.get('/movie/:id', movieMethods.detail);
// 录入页
router.get('/admin/movie', adminLive.check, adminPower.check, movieMethods.addMovie);
// 提交
router.post('/admin/movie/new', adminLive.check, adminPower.check, multipartMiddleware, movieMethods.savePoster, movieMethods.submit);
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

// 电影分类添加页
router.get('/admin/movie/newCategory', adminLive.check, adminPower.check, categoryMethods.new);
// 分类提交
router.post('/admin/movie/newCategory', adminLive.check, adminPower.check, categoryMethods.submit);
// 分类列表(分类类型)
router.get('/admin/movie/categoryList', adminLive.check, adminPower.check, categoryMethods.getList);
// 分类列表(某类型所有电影)
router.get('/result', categoryMethods.result);

module.exports = router;
