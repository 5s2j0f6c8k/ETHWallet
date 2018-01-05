# 此项目是ETH钱包的实现

## 实现功能

> 用户注册
>
> 申请钱包
>
> 转账充值

## 实现技术

> 客户端采用react
>
> 服务器采用node.js
>
> 数据库使用mongodb
>
> ETH 客户端使用 Ganache

## 设计数据库

> 数据库使用mongoose 进行对象管理和数据库连接
>
> 添加用户表描述
>
```
'use strict';

import mongoose from 'mongoose'


const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: { type: String },
    userpwd: { type: String },
    ethAddress: { type: String },
    ethParivateKey: { type: String },
    accountBlance:{type:Number }
})

const User = mongoose.model('User', userSchema);


export default User
```

> 测试框架采用mocha
>
> 要支持ES6 需要添加ES6 配置 使用  mocha --compilers js:babel-core/register 执行
>
> 添加用户表测试案例
>

```
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
```

> 执行测试案例 npm test