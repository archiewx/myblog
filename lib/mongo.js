/*** Created by anno on 2016/12/5. */
// 链接
var config = require('config-lite')
var Mongolass = require('mongolass')
var mongolass = new Mongolass()
mongolass.connect(config.mongodb)
exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
})

exports.Post = mongolass.model('Post', {
    author: { type: Mongolass.Types.ObjectId },
    title: { type: 'string' },
    content: { type: 'string' },
    pv: { type: 'number' }
})
// 按照创建时间降序排列
exports.Post.index({ author: 1, _id: -1 }).exec()

// 留言
exports.Comment = mongolass.model('Comment', {
    author: { type: Mongolass.Types.ObjectId },
    content: { type: 'string' },
    postId: { type: Mongolass.Types.ObjectId }
})
exports.Comment.index({ postId: 1, _id: 1}).exec() // 通过文章id 获取该文章下的留言，通过留言的时间升序排列
exports.Comment.index({ author: 1, _id: 1}).exec() // 通过用户id 和 留言id 删除一个留言

var moment = require('moment')
var objectIdToTimestamp = require('objectid-to-timestamp')

mongolass.plugin('addCreateAt', {
    afterFind: function(results) {
        results.forEach(function(item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
        })
        return results
    },
    afterFindOne: function(result) {
        if(result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
        }
        return result
    }
})

// 根据用户名找到用户，同事设置了name为唯一索引
exports.User.index({name: 1}, {unique: true}).exec()