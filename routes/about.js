let express = require('express');
let router = express.Router();
let ArticleModel = require('../models/articles');
let CategoryModel = require('../models/category');
let config = require('config-lite');


router.get('/', function(req, res, next) {

});

router.get('/:id', function(req, res, next) {
    let authorId = req.params.id;
    // 用户点击的作者是否是用户本人
    if(authorId !== req.session.user._id) {
        Promise.all([
            ArticleModel.getArticles(authorId),
            CategoryModel.getCategories()
        ]).then(function (results) {
            let articles = results[0];
            let categories = results[1];
            res.render('articles', {
                title: articles[0].author.name + '的文章列表 | ' + config.author,
                articles: articles,
                categories: categories
            });
        }).catch(next)
    } else {
        res.redirect('/my');
    }

});


module.exports = router;