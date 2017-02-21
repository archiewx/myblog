let Mongolass = require('mongolass');
let mongolass = require('../db/dbconfig');
let Article = mongolass.model('Article', {
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
        return Article
            .create(article)
            .exec();
    },
    // 通过id获取文章
    getArticleById: function(articleId) {
        return Article
            .findOne({ _id: articleId })
            .populate({ path: 'author', model: 'User' })
            .populate({ path: 'category', model: 'Category'})
            .addCreateAt()
            .exec();
    },
    getArticles: function(query) {
        if(!query) {
            query = {};
        }
        return Article
            .find(query)
            .populate({ path: 'author', model: 'User' })
            .populate({ path: 'category', model: 'Category' })
            .sort({ _id: -1 })
            .addCreateAt()
            .exec();
    },
    updatePostById: function(articleId, data) {
        return Article
            .update({ _id: articleId }, { $set: data })
    },
    delArticleById: function(articleId) {
        return Article
            .remove({ _id: articleId })
            .exec();
    }
};
