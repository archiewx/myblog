'use strict'
let path = require('path')
let express = require('express')
let session = require('express-session')
let MongoStore = require('connect-mongo')(session)
let flash = require('connect-flash')
let config = require('config-lite')
let routes = require('./routes')
let pkg = require('./package')
// 导入日志模块
let winston =require('winston')
let expressWinston = require('express-winston')

let app = express()

// 设置模板目录
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为ejs
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))
// session 中间件
app.use(session({
    name: config.session.key, // 设置cookie中保存session id的字段名称
    secret: config.session.secret,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore({
        url: config.mongodb
    })
}))

// flash中间间， 用来显示通知
app.use(flash())
//表单处理
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
    keepExtensions: true // 保留后缀
}))

// 设置模板全局变量
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
}
// 添加模板三个必须的变量
app.use(function(req, res, next) {
    res.locals.user = req.session.user
    res.locals.success = req.flash('success').toString()
    res.locals.error = req.flash('error').toString()
    next()
})

app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}))
// 路由
routes(app)
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}))
// 处理错误
app.use(function (err, req, res, next) {
    res.render('error', {
        error: err
    })
})
// 监听端口，启动程序
const port = process.env.PORT || config.port
if(module.parent) {
    module.exports = app
} else {
    app.listen(port, function() {
        console.log(`${pkg.name} listening on port ${config.port}`)
    })
}
