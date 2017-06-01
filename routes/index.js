module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', {
      title: 'anno`s blog | 战斗在一线的小型前端攻城狮!'
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
  app.use('/upload', require('./upload'));
  app.use('/admin', require('./admin'));
  app.use('/test', require('./test/test'));
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.render('404')
    }
  })
};
