let path = require('path')
let assert = require('assert')
let request = require('supertest')
let app = require('../app')
let User = require('./mongo').User

describe('signup', function() {
    describe('POST /signup', function() {
        let agent = request.agent(app)
        beforeEach(function(done) {
            User
                .create({
                    name: 'aaa',
                    password: '123456',
                    avatar: '',
                    gender: 'x',
                    bio: ''
                })
                .exec()
                .then(function() {
                    done()
                })
                .catch(done)
        })
        afterEach(function(done) {
            User
                .remove({})
                .then(function() {
                    done()
                })
                .catch(done)
        })
        // 用户名错误情况
        it('wrong name', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'test.bmp'))
                .field({ name: '' })
                .redirects()
                .end(function(err, res) {
                    if(err) {
                        return done(err)
                    }
                    assert(res.text.match(/名字请限制在1-10个字符/))
                    done()
                })
        })
        // 性别错误的情况
        it('wrong gender', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'test.bmp'))
                .field({ name: 'cccc', gender: 'a' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/性别只能是 m、f 或 x/));
                    done();
                });
        });
        // 其余的参数测试自行补充
        // 用户名被占用的情况
        it('duplicate name', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'test.bmp'))
                .field({ name: 'aaa', gender: 'm', bio: 'noder', password: '123456', repassword: '123456' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/用户名被占用/));
                    done();
                });
        });

        // 注册成功的情况
        it('success', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'test.bmp'))
                .field({ name: 'anno', gender: 'm', bio: 'noder', password: '123456', repassword: '123456' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/注册成功/));
                    done();
                });
        });
    })
})