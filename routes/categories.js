let express = require('express');
let config = require('config-lite');
let router = express.Router();
let CategoryModel = require('../models/category');
let ArticleModel = require('../models/articles');

router.get('/', function (req, res, next) {
    CategoryModel
        .getCategories()
        .then(function(categories) {
            res.render('categories', {
                title: '分类搜索 | ' +  config.author,
                categories: categories
            });
        })
        .catch(next);
});

router.get('/:id', function (req, res, next) {
    let categoryId = req.params.id;
    ArticleModel
        .getArticles({ category: categoryId })
        .then(function(articles) {
            console.log(articles);
            if(articles.length == 0) {
                title = '该分类没有文章 | ' + config.author;
            } else {
                title = articles[0].category.name + ' | ' + config.author;
            }
            res.render('categorie', {
                title: title,
                articles: articles
            })
        })
        .catch(next);
});

module.exports = router;