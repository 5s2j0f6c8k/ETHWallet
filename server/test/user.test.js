import chalk from 'chalk';
import assert from 'assert';
import chai from 'chai';
import mongoose from 'mongoose';
import User from '../model/user';

mongoose.connect('mongodb://localhost:27017/mydb');

const expect = chai.expect;

describe('User',function(){
    describe('#UserDao',function(){
        it('测试插入mongodb 插入用户表数据',function(done){
            var user = new User({
                username : 'qgass',
                userpwd : 'abcd',
                ethAddress : 'ASDF123KDAKJDHAKASDA',
                ethParivateKey : 'AAAAAAAAAAAAAAAAA',
                accountBlance : 10000
            });
            user.save(function(err,res){
                expect(res.username).to.be.equal('qgass')
                done()
            })
        });

        
        it('测试更新mongodb 更新用户表数据',function(done){
            User.update({username:'qgass'},{userpwd:'123456'},function(err,res){
                expect(res.ok).to.be.equal(1)
                done()
            })
        });
        
        it('测试删除mongodb 删除用户表数据',function(done){
            User.remove({username:'qgass'},function(err,res){
                expect(res.ok).to.be.equal(1)
                done()
            })
        })
    })
})