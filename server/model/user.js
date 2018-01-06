'use strict';

import mongoose from 'mongoose'
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: { type: String,unique:true},
    userpwd: { type: String },
    ethAddress: { type: String },
    ethParivateKey: { type: String },
    accountBlance:{type:Number }
})

/**
 * 添加加密保存密码中间件
 */
userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('userpwd')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.userpwd, salt, function(err, hash) {
            if (err) return next(err);
            user.userpwd = hash;
            next();
        });
    });
});

/**
 * 添加验证密码
 */
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.userpwd, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', userSchema);