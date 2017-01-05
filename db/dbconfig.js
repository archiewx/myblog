let config = require('config-lite');
let Mongolass = require('mongolass');
let mongolass = new Mongolass();
mongolass.connect(config.mongodb);

module.exports = mongolass;