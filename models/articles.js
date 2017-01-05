let Mongolass = require('mongolass');
let mongolass = require('../db/dbconfig');
let Article = mongolass.model('Article', {
    author: { type: Mongolass.Types.ObjectId },
    title: { type: 'string' },
    category: { type: Mongolass.Types.ObjectId },
    content: { type: 'string' }
})
exports.Article.index({ author: 1, _id: -1 }).exec();
exports.module = Article;