let express = require('express'),
  router = express.Router(),
  sha1 = require('sha1'),
  config = require('config-lite'),
  formidable = require('formidable');

let UserModel = require('../models/users');
let checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signin', {
    title: '登录 | ' + config.author
  });
  next();
});

router.post('/', checkNotLogin, function (req, res, next) {
  // 获取提交的参数
  let form = formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let name = fields.name,
      password = fields.password;

    // 登陆验证
    UserModel.getUserByName(name)
      .then(function (user) {
        if (!user) {
          req.flash('error', '用户名不存在');
          return res.redirect('back')
        }
        // 检查密码
        if (sha1(password) !== user.password) {
          req.flash('error', '用户名或密码错误')
        }
        req.flash('success', '登陆成功');

        delete user.password;
        req.session.user = user;
        // 跳转到主页
        res.redirect('/')
      })
  })
});

module.exports = router;

