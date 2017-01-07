var Mongolass = require('mongolass');
var mongolass = require('../db/dbconfig');
var Article = mongolass.model('Article', {
    author: { type: Mongolass.Types.ObjectId },
    title: { type: 'string' },
    category: { type: Mongolass.Types.ObjectId },
    content: { type: 'string' },
    description: { type: 'string' }
});
Article.index({ author: 1, _id: -1 }).exec();

module.exports = {
    // 创建一个篇文章
    create: function(article) {
        return Article.create(article).exec();
    },
    // 通过id获取文章
    getArticleById: function(articleId) {
        return Article
            .findOne({ _id: articleId })
            .populate({ path: 'author', model: 'Usre' })
            .populate({ path: 'category', model: 'Category'})
            .addCreateAt()
            .exec();
    },
    getArticles: function(author) {
        var query = {};
        if(author) {
            query.author = author
        }
        return Article
            .find(query)
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: -1 })
            .addCreateAt()
            .exec();
    },
    updatePostById: function(articleId, author, data) {
        return Article
            .update({ author: author, _id: articleId }, { $set: data })
    },
    delArticleById: function(articleId, author) {
        return Article
            .remove({ author: author, _id: articleId })
            .exec();
    }
};
