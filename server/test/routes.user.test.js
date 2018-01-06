/*
 * @Author: qugang 
 * @Date: 2018-01-06 18:08:22 
 * @Last Modified by: qugang
 * @Last Modified time: 2018-01-07 00:05:32
 */

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

        it('测试转账交易',function(done){
            chai.request(server)
            .post("/users/transfer")
            .set("x-access-token",userInfo.token)
            .send({
                'ethAddress':'qugang',
                'value':'1000000000000000000',
                'privateKey': '0x74e378495bec50e2599c733ffa2b2083c04d6a016c3aea7e9ef9ac8f29de0283'
            })
            .end(function(err,res){
                chai.expect(res.body.resultCode).to.be.equal("1000")
                userInfo = res.body
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