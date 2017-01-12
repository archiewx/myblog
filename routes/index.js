module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {
            title: 'anno`s blog | 来啊，相互伤害啊!'
       })
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/articles', require('./articles'));
    app.use('/categories', require('./categories'));
    app.use('/about', require('./about'));
    app.use('/my', require('./my'));
    app.use('/friends', require('./myfriend'));
    app.use(function(req, res) {
        if(!res.headersSent) {
            res.render('404')
        }
    })
};