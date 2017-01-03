let path = require('path')
var sha1 = require('sha1')
let express = require('express')
let router = express.Router()

let UserModel = require('../models/users')
let checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/', checkNotLogin, function(req, res, next) {
    res.render('signup', {
        title: '注册'
    })
})

router.post('/', checkNotLogin, function(req, res, next) {
    let name = req.fields.name
    let gender = req.fields.gender
    let bio = req.fields.bio
    let avatar = req.files.avatar.path.split(path.sep).pop()
    let password = req.fields.password
    let repassword = req.fields.repassword
    // 校验参数
    try{
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在1-10个字符');
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('性别只能是 m、f 或 x');
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符');
        }
        if (!req.files.avatar.name) {
            throw new Error('缺少头像');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    }catch(e) {
        req.flash('error', e.message)
        return res.redirect('/signup')
    }
    // 密码加密
    password = sha1(password)

    // 组织用户信息保存到数据库
    let user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    }
    UserModel.create(user).then(function(result) {
        // result为插入 数据库后的返回值
        user = result.ops[0]
        delete user.password
        req.session.user = user
        // 写入flush
        req.flash('success', '注册成功')
        // 跳转到首页
        res.redirect('/posts')
    }).catch(function(e) {
        if(e.message.match('11000 E11000 duplicate key')) {
            req.flash('error', '用户名被占用')
            return res.redirect('/signup')
        }
        next(e)
    })
})

module.exports = router
