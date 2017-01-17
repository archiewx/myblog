/*** Created by anno on 2016/12/19. */

let path = require('path')
let assert = require('assert')
let app = require('../app')
let User = require('./mongo').User
let request = require('supertest')
let sha1 = require('sha1')

describe('signin', function() {
    describe('POST /signin', function() {
        let agent = request.agent(app)
        beforeEach(function(done) {
            User
                .create({
                    name: 'base',
                    password: '123456',
                    avatar: '',
                    gender: 'x',
                    bio: ''
                })
                .exec()
                .then(function() {
                    done()
                })
        })
        afterEach(function(done) {
            User
                .remove({})
                .then(function() {
                    done()
                })
                .catch(done)
        })
        // 用户名不存在的情况
        it('wrong name', function(done) {
            agent
                .post('/signin')
                .type('form')
                .field({ name: 'cccc', password: '123456' })
                .redirects()
                .end(function(err, res) {
                    if(err) {
                        return done(err)
                    }
                    assert(res.text.match(/用户名不存在/))
                    done()
                })
        })
        // 密码错误
        it('wrong password', function(done) {
            agent
                .post('/signin')
                .type('form')
                .field({ name: 'base', password: '123456' })
                .redirects()
                .end(function(err, res) {
                    if(err) {
                        return done(err)
                    }
                    assert(res.text.match(/用户名或密码错误/))
                    done()
                })
        })

        //登陆成功
        it('login success', function(done) {
            agent
                .post('/signin')
                .type('form')
                .field({ name: 'base', password: '123456' })
                .redirects()
                .end(function(err, res) {
                    if(err) {
                        return done(err)
                    }
                    assert(res.text.match(/登陆成功/))
                    done()
                })
        })
    })
})