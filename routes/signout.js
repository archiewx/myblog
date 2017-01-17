let express = require('express');
let router = express.Router();

let checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, function(req, res, next) {
    // 清空session 中用户信息
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/')
});

module.exports = router;