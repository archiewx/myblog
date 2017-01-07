let mongolass = require('../db/dbconfig');

let Navs = mongolass.model('Navs', {
    nidx: { type: 'number' },
    name: { type: 'string' },
    route: { type: 'string' },
    description: { type: 'string' }
});

module.exports = {
    getNavs: function() {
        return Navs
            .find()
            .sort({ nidx: -1 })
            .exec();
    }
};
