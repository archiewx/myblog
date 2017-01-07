/**
 * Created by zhenglfsir on 2017/1/7.
 */
let mongolass = require('../db/dbconfig');

let Roles = mongolass.model('Roles', {
    name: { type: 'string' },
    description: { type: 'string' }
});

module.exports = {
    getRoles: function() {
        return Roles
            .find()
            .addCreatedAt()
            .exec();
    }
};