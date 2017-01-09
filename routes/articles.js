let express = require('express');
let router = express.Router();
let config = require('config-lite');
let ArticleModel = require('../models/articles');
let CategoryModel = require('../models/category');
let check = require('../middlewares/check');

router.get('/', function (req, res, next) {
    Promise.all([
        ArticleModel.getArticles(),
        CategoryModel.getCategories()
    ]).then(function (results) {
        let articles = results[0];
        let categories = results[1];
        res.render('articles', {
            title: '文章列表 | ' + config.author,
            articles: articles,
            categories: categories
        });
    }).catch(next)
});

router.post('/create', function (req, res, next) {
    let author = req.session.user._id;
    let title = req.fields.title;
    let category = req.fields.category;
    let content = req.fields.content;
    let description = req.fields.description;
    try {
        if (!title.length) {
            throw new Error('标题为空');
        }
        if (!category.length) {
            throw new Error('选择分类');
        }
        if (!content.length) {
            throw new Error('请填写文章内容');
        }
        let article = {
            author: author,
            title: title,
            category: category,
            content: content,
            description: description
        };
        ArticleModel
            .create(article)
            .then(function (result) {
                // 此article为插入数据库后的值
                article = result.ops[0];
                req.flash('success', '发表成功');
                res.redirect(`/articles/detail/${ article._id }`);
            })
            .catch(next);
    } catch (e) {
        req.flash('error', e.message);
        req.redirect('/article/create');
    }

});

router.get('/create', check.checkLogin, function (req, res, next) {
    CategoryModel
        .getCategories()
        .then(function (categories) {
            res.render('create', {
                title: '创建文章 | ' + config.author,
                categories: categories
            });
        }).catch(next);
});

router.get('/detail/:id', function (req, res, next) {
    let articleId = req.params.id;
    ArticleModel
        .getArticleById(articleId)
        .then(function (result) {
            let article = result;
            if (!article) {
                throw new Error('文章不存在');
            }
            res.render('article', {
                title: article.title +' | ' + config.author,
                article: article
            });
        }).catch(next);
});

module.exports = router;