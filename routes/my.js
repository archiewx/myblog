const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router(),
    ArticleModel = require('../models/articles'),
    UserModel = require('../models/users'),
    config = require('config-lite'),
    check = require('../middlewares/check');

router.get('/', check.checkLogin, function (req, res, next) {
    let authorId = req.query.author ? req.query.author : req.session.user._id;
    Promise.all([
        UserModel.getUserByUserId(authorId),
        ArticleModel.getArticles({author: authorId})
    ]).then(function (results) {
        let info = results[0];
        let articles = results[1];
        if (info.role.name != 'normal') {
            let RoleModel = require('../models/roles');
            RoleModel
                .getRoles()
                .then(function (roles) {
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

router.post('/', check.checkLogin, function (req, res, next) {
    let name = req.fields.username,
        bio = req.fields.bio,
        userId = req.session.user._id,
        avatar = req.files.avatar.path.split(path.sep).pop(),
        user = {name, avatar, bio};
    //fixme 问题同修改文章
    try {
        // 删除原来的 用户图片
        fs.unlink(`${ process.cwd() }/public/img/upload/${ req.session.user.avatar }`, (err) => {
            if (err) throw err;
        });

    } catch (e) {
        // 出现错误 删除上传的图片
        fs.unlink(req.files.avtar.path);
        req.flash('error', '修改个人信息失败')
        return res.redirect('/my');
    }
    UserModel
        .updateUserByUserId(userId, user)
        .then(function () {
            req.flash('success', '修改个人信息成功');
            Object.assign(req.session.user, user);
            res.redirect('/my');
        });

});

module.exports = router;