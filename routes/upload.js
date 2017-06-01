let express = require('express'),
  router = express.Router(),
  config = require('config-lite'),
  foridable = require('formidable')

router.post('/file', function(req, res, next) {

})

router.get('/token', function(req, res, next) {
  res.end(Date.now());
})

module.exports = router;
