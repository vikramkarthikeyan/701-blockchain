var config = require('../config.json');
var Web3 = require('web3');
const Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain_endpoint));

// Setup contract instance
var contractArtifact = require('../../survey-contract/build/contracts/Survey.json');
var contractInstance = new web3.eth.Contract(contractArtifact.abi, config.contract_address);

module.exports = {

    // Get current nonce and sign transaction
    signTransaction: function(abi) {
        web3.eth.getTransactionCount(config.primary_account).then(function(count){
            let tx = {
              gas: 1000000,
              data: abi,
              value: 0,
              nonce: count,
              to: config.contract_address
            }
          
            var privateKey = Buffer.from(config.private_key, 'hex')
            var transaction = new Tx(tx);
          
            transaction.sign(privateKey);
          
            web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
                      .on('transactionHash',console.log);
        });
    },

    // Wrappers for Smart Contract functions
    
    getRegisterUserABI: function(personNumber, callback) {
        callback(contractInstance.methods.registerUser(personNumber).encodeABI());
    },

    getSurveyCount: function(callback) {
        contractInstance.methods.getSurveyCount().call().then(function(count){
            callback(count);
        });
    }
};

