let express = require('express');
let router = express.Router();
let ArticleModel = require('../models/articles');
let config = require('config-lite');

router.get('/', function(req, res, next) {
    res.render('my', {
        title: req.session.user.name + ' | ' + config.author
    });
    next();
});



module.exports = router;