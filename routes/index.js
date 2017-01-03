module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {
            title: 'anno`s blog | 自己玩自己的'
        })
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
    app.use('/articles', require('./articles'));
    app.use(function(req, res) {
        if(!res.headersSent) {
            res.render('404')
        }
    })
};