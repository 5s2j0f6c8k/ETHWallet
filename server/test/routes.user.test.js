import chalk from 'chalk';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import mongoose from 'mongoose';
import User from '../model/user';

chai.use(chaiHttp)

mongoose.connect('mongodb://localhost:27017/mydb');

describe('User', function (done) {
    describe('#UserRoutes', function () {
        it('测试注册用户', function (done) {
            chai.request(server)
                .post("/users/register")
                .send({
                    'username': 'qugang',
                    'userpwd': '123456'
                })
                .end(function(err,res){
                    chai.expect(res.body.resultCode).to.be.equal("1000")
                    done()
                })
        });

        var userInfo;
        it('测试用户登陆',function(done){
            chai.request(server)
            .post("/users/login")
            .send({
                'username':'qugang',
                'userpwd':'123456'
            })
            .end(function(err,res){
                chai.expect(res.body.resultCode).to.be.equal("1000")

                userInfo = res.body
                done()
            })
        })
        it('测试查询用户信息(成功)',function(done){
            chai.request(server)
                .get("/users/userInfo")
                .set("x-access-token",userInfo.token)
                .end(function(err,res){
                    chai.expect(res.body.username).to.be.equal("qugang")
                    done()
                })
        })

        it('测试查询用户信息(失败)',function(done){
            chai.request(server)
            .get("/users/userInfo")
            .end(function(err,res){
                chai.expect(res.status).to.be.equal(401)
                done()
            })
        })

        it('测试完毕清除用户数据',function(done){
            User.remove({ username: 'qugang' }).then(function ( res) {
                chai.expect(res.ok).to.be.equal(1)
                done()
            })
        })
    })
})