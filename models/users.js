let mongolass = require('../db/dbconfig');


let User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    code: { type: 'string' },
    bio: { type: 'string' }
});
module.exports = {
    // 注册一个用户
    create: function create(user) {
        return User.create(user).exec()
    },
    getUserByName: function getUserByName(name) {
        return User
            .findOne({ name: name })
            .addCreateAt()
            .exec()
    }
}