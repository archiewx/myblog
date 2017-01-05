let express = require('express');
let router = express.Router();
let config = require('config-lite');

router.get('/', function(req, res, next) {
    res.render('articles', {
        title: '文章列表 | ' + config.author
    });
    next()
});

router.post('/', function(req, res, next) {
//    let author = req.session.user._id;
    let title = req.fields.title;
    let category = req.fields.category;
    let content = req.fields.content;

    try {
        if(!title.length) {
            throw new Error('标题为空');
        }
        if(!category.length) {
            throw new Error('选择分类');
        }
        if(!content.length) {
            throw new Error('请填写文章内容');
        }
    } catch (e) {
        req.flush('error', e.getMessage());
        req.redirect('/article/create');
    }

})

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