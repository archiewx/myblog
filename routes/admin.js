const express = require('express'),
    router = express.Router(),
    config = require('config-lite'),
    check = require('../middlewares/check'),
    UserModel = require('../models/users'),
    CategoryModel = require('../models/category');

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
                title: `用户管理 | ${ config.author }`,
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

router.get('/categories', check.checkLogin, function(req, res, next) {
    CategoryModel
        .getCategories()
        .then(function(categories) {
            res.render('admin/categories', {
                title: `分类管理 | ${ config.author }`,
                categories
            })
        })
        .catch(next);
});

router.get('/categories/remove/:id', check.checkLogin, function(req, res, next) {
    CategoryModel
        .deleteCategory(req.params.id)
        .then(function() {
            res.redirect('/admin/categories');
        })
        .catch(next);

});

module.exports = router;