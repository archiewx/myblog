let express = require('express');
let router = express.Router();
let config = require('config-lite');

router.get('/', function(req, res, next) {
    res.render('articles', {
        title: '文章列表 | ' + config.author
    });
    next()
});

router.get('/detail/:id', function(req, res, next) {
    res.render('article', {
        title: '文章名字 | ' + config.author
    });
    next();
});

router.get('/create', function(req, res, next) {
    res.render('create', {
        title: '创建文章 | ' + config.author
    });
    next()
});

module.exports = router;