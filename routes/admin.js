const express = require('express'),
    router = express.Router(),
    config = require('config-lite'),
    check = require('../middlewares/check'),
    UserModel = require('../models/users');

router.get('/',check.checkLogin, function (req, res, next) {
    res.render('admin/index', {
        title: '幕后黑手 | ' + config.author
    })
});

router.get('/users', check.checkLogin, function (req, res, next) {
    UserModel
        .getUsers()
        .then(function(users) {
            res.render('admin/users', {
                title: '用户管理 | ' + config.author,
                users: users
            })
        })
        .catch(next);
});

router.get('/users/remove/:id', check.checkLogin, function(req, res, next) {
    UserModel
        .removeUser(req.params.id)
        .then(function() {
            res.redirect('/admin/users')
        })
        .catch(next);

});

module.exports = router;