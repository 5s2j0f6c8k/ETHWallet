/*
 * @Author: qugang 
 * @Date: 2018-01-06 18:08:18 
 * @Last Modified by: qugang
 * @Last Modified time: 2018-01-07 14:08:08
 */

import chalk from 'chalk';
import assert from 'assert';
import chai from 'chai';
import mongoose from 'mongoose';
import User from '../model/user';
import dbConnect from '../comm/dbConnect'

dbConnect()


const expect = chai.expect;

describe('User', function () {
    describe('#UserDao', function () {
        this.timeout(15000);
        it('测试插入mongodb 插入用户表数据', function (done) {
            var user = new User({
                username: 'qgass',
                userpwd: 'abcd',
                ethAddress: 'ASDF123KDAKJDHAKASDA',
                ethParivateKey: 'AAAAAAAAAAAAAAAAA',
                accountBlance: 10000
            });
            user.save(function (err,res) {
                expect(res.username).to.be.equal('qgass')
                done()
            })
        });

        it('测试查询mongodb 查询用户表数据', function (done) {
            User.find({username:'qgass'}).then(function (res) {
                expect(res[0].username).to.be.equal('qgass')
                expect(res[0].ethAddress).to.be.equal('ASDF123KDAKJDHAKASDA')
                expect(res[0].ethParivateKey).to.be.equal('AAAAAAAAAAAAAAAAA')
                expect(res[0].accountBlance).to.be.equal(10000)
                done()
            })
        })


        it('测试更新mongodb 更新用户表数据', function (done) {
            User.update({ username: 'qgass' }, { userpwd: '123456' }).then(function (res) {
                expect(res.ok).to.be.equal(1)
                done()
            })
        });

        it('测试删除mongodb 删除用户表数据', function (done) {
            User.remove({ username: 'qgass' }).then(function ( res) {
                expect(res.ok).to.be.equal(1)
                done()
            })
        })
    })
})