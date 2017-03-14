let config = require('config-lite');
let Mongolass = require('mongolass');
let mongolass = new Mongolass();
let moment = require('moment');
let objectIdToTimestamp = require('objectid-to-timestamp');
mongolass.connect(config.mongodb);

mongolass.plugin('addCreateAt', {
    afterFind: function(results) {
        results.forEach(function(item) {
           item.created_at = moment(objectIdToTimestamp(item._id));
        });
        return results;
    },
    afterFindOne: function(result) {
        if(result) {
            result.create_at = moment(objectIdToTimestamp(result._id));
        }
        return result;
    }
});

module.exports = mongolass;