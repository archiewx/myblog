let mongolass = require('../db/dbconfig');

let Category = mongolass.model('Category', {
    name: { type: 'string' },
    description: { type: 'string' },
    icon: { type: 'string' }
});
Category.index({ name: 1, _id: -1 }).exec();

module.exports = {
    create: function(category) {
        return Category
            .create(category)
            .exec();
    },
    getCategories: function() {
        return Category
            .find({ })
            .sort({ _id: 1})
            .addCreateAt()
            .exec();
    },

};
