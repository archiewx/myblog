let express = require('express')
let router = express.Router()
let sha1 = require('sha1')

let UserModel = require('../models/users')
let checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/', checkNotLogin, function(req, res, next) {
    res.render('signin', {
        title: '登录'
    })
    next()
})

router.post('/', checkNotLogin, function(req, res, next) {
    // 获取提交的参数
    let name = req.fields.name
    let password = req.fields.password

    // 登陆验证
    UserModel.getUserByName(name)
        .then(function(user) {
            if(!user) {
                req.flash('error', '用户名不存在')
                return res.redirect('back')
            }
            // 检查密码
            if(sha1(password) !== user.password) {
                req.flash('error', '用户名或密码错误')
            }
            req.flash('success', '登陆成功')

            delete user.password
            req.session.user = user
            // 跳转到主页
            res.redirect('/posts')
        })
})

module.exports = router

