let express = require('express');
let config = require('config-lite');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.render('categories', {
        title: ' | ' +  config.author
    });
    next()
});

router.get('/:id', function (req, res, next) {
    next()
});

module.exports = router;