module.exports = {
    port: 3000,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/myblog',
    // mongodb: 'mongodb://myblog:myblog2017zzcl@59.110.69.74:27017/myblog',
    author: 'zzcl`s blog'
};