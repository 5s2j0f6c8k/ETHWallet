import Web3 from 'web3'

var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')

let web3 = new Web3(provider)
  
module.exports = web3