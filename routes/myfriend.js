let express = require('express');
let router = express.Router();
let config = require('config-lite');



router.get('/', function(req, res, next) {
    res.render('friends', {
        title: '左邻右舍 | ' + config.author
    })
});


module.exports = router;
