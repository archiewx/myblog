let mongolass = require('../db/dbconfig');

let Category = mongolass.model('Category', {
    name: { type: 'string' },
    childs: { type: 'object' },
    childsObject: { type: 'object' },
    parent: { type: 'boolean' },
    icon: { type: 'string' }
});
Category.index({ name: 1, _id: -1 }).exec();

mongolass.plugin('addChilds', {
    afterFind: function (results) {
        // let promise = new Promise(resolve, reject);
        results.forEach(function(category) {
            if(category.childs.length > 0) {
                category.childs.forEach(function(id) {
                    Category
                        .findOne({ _id: id })
                        .exec()
                        .then(function(child) {
                            category.childsObject.push(child);
                        });
                });
            }
        });
        return results;
    },
});



module.exports = {
    create: function(category) {
        return Category
            .create(category)
            .exec();
    },
    getCategories: function() {
        return Category
            .find({ parent: true })
            .sort({ _id: 1})
            .addCreateAt()
            .addChilds()
            .exec();
    },
    getNullChildsCategories: function() {
        return Category
            .find({ childs: [] })
            .sort({ _id: 1 })
            .addCreateAt()
            .exec();
    }
};
