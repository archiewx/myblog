let express = require('express');
let config = require('config-lite');
let router = express.Router();
let CategoryModel = require('../models/category');

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
    next()
});

module.exports = router;