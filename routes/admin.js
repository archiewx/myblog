let express = require('express');
let router = express.Router();
let config = require('config-lite');

router.get('/', function(req, res, next) {
    res.render('admin/index', {
        title: '幕后黑手 | ' + config.author
    })
});



module.exports = router;