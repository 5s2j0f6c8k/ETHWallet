/*
 * @Author: qugang 
 * @Date: 2018-01-06 23:46:35 
 * @Last Modified by: qugang
 * @Last Modified time: 2018-01-06 23:56:21
 */

import chalk from 'chalk';
import assert from 'assert';
import chai from 'chai';
import web3 from '../comm/web3Wrapper'

describe('Web3', function () {
    describe('#Web3Op', function () {
        this.timeout(15000);
        var result;
        it('测试Web3创建账户',function(){
            result = web3.eth.accounts.create()
            chai.expect(result.address).to.not.equal(undefined)
        })
    })
})