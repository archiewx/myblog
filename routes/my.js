let express = require('express');
let router = express.Router();
let ArticleModel = require('../models/articles');
let UserModel = require('../models/users');
let config = require('config-lite');
let check = require('../middlewares/check');

router.get('/', check.checkLogin, function(req, res, next) {
    let authorId = req.query.author? req.query.author: req.session.user._id;
    Promise.all([
        UserModel.getUserByUserId(authorId),
        ArticleModel.getArticles(authorId)
    ]).then(function(results) {
        let info = results[0];
        let articles = results[1];
        if(info.role.name != 'normal') {
            let RoleModel = require('../models/roles');
            RoleModel
                .getRoles()
                .then(function(roles) {
                    res.render('my', {
                        title: req.session.user.name + ' | ' + config.author,
                        articles: articles,
                        info: info,
                        roles: roles
                    });
                }).catch(next);
        } else {
            res.render('my', {
                title: req.session.user.name + ' | ' + config.author,
                articles: articles,
                info: info
            });
        }
    }).catch(next);
});



module.exports = router;