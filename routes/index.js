var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});

router.get('/movie/:id', function(req, res, next) {
  res.render('detail', { title: '详情页' });
});

router.get('/admin/movie', function(req, res, next) {
  res.render('admin', { title: '后台录入页' });
});

router.get('/admin/list', function(req, res, next) {
  res.render('list', { title: '列表页' });
});


module.exports = router;
