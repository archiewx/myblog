var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var config = require('config-lite');

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function(req, res, next) {
    res.render('signin', {
        title: '登录 | ' + config.author
    });
    next();
});

router.post('/', checkNotLogin, function(req, res, next) {
    // 获取提交的参数
    var name = req.fields.name;
    var password = req.fields.password;

    // 登陆验证
    UserModel.getUserByName(name)
        .then(function(user) {
            if(!user) {
                req.flash('error', '用户名不存在');
                return res.redirect('back')
            }
            // 检查密码
            if(sha1(password) !== user.password) {
                req.flash('error', '用户名或密码错误')
            }
            req.flash('success', '登陆成功');

            delete user.password;
            req.session.user = user;
            // 跳转到主页
            res.redirect('/')
        })
});

module.exports = router;

