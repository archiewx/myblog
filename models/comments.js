let marked = require('marked')
let Comment = require('../db/db').Comment

// 将 comment的 content 从Markdown 转换成 html
Comment.plugin('contentToHtml', {
    afterFind: function(comments) {
        return comments
            .map(function(comment) {
                comment.content = marked(comment.content)
                return comment
            })
    }
})

module.exports = {
    create: function(comment) {
        return Comment
            .create(comment)
            .exec()
    },
    delCommentById: function(commentId, author) {
        return Comment
            .remove({
                author: author,
                _id: commentId
            })
            .exec()
    },
    delCommentsByPostId: function(postId) {
        return Comment
            .remove({
                postId: postId
            })
            .exec()
    },
    getComments: function(postId) {
        return Comment
            .find({ postId: postId })
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: 1 })
            .addCreateAt()
            .contentToHtml()
            .exec()
    },
    getCommentsCount: function(postId) {
        return Comment
            .count({ postId: postId })
            .exec()
    }
}