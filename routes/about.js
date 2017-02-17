let express = require('express');
let router = express.Router();
let ArticleModel = require('../models/articles');
let UserModel = require('../models/users');
let config = require('config-lite');


router.get('/', function(req, res, next) {
    res.render('about', {
        title: 'About | ' + config.author
    });
});

router.get('/:id', function(req, res, next) {
    let authorId = req.params.id;
    // 用户点击的作者是否是用户本人
    if(req.session.user == null || (req.session.user._id != authorId && req.session.user != null)) {
        Promise.all([
            ArticleModel.getArticles({ author: authorId }),
            UserModel.getUserByUserId(authorId)
        ]).then(function (results) {
            let articles = results[0];
            let info = results[1];
            res.render('my', {
                title: articles[0].author.name + '的文章列表 | ' + config.author,
                articles: articles,
                info: info
            });
        }).catch(next)
    } else {
        res.redirect('/my');
    }

});


module.exports = router;