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