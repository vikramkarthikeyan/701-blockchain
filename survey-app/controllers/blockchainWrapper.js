var config = require('../config.json');
var Web3 = require('web3');
const Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain_endpoint));

// Setup contract instance
var contractArtifact = require('../../survey-contract/build/contracts/Survey.json');
var contractInstance = new web3.eth.Contract(contractArtifact.abi, config.contract_address);

module.exports = {

    // Get current nonce and sign transaction
    signTransaction: function(abi, callback) {
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
                      .on('transactionHash', function(hash){
                          console.log("Txn executed");
                          callback(200);
                      })
                      .on('error', function(err){
                          console.log("Txn reverted/failed");
                          callback(500);
                      });
        });
    },

    // Wrappers for Smart Contract functions
    getRegisterUserABI: function(personNumber, callback) {
        callback(contractInstance.methods.registerUser(personNumber).encodeABI());
    },

    getSurveyEntryABI: function(personNumber, callback) {
        callback(contractInstance.methods.addSurveyEntry(personNumber).encodeABI());
    },

    getSurveyCount: function(callback) {
        contractInstance.methods.getSurveyCount().call().then(function(count){
            callback(count);
        });
    },

    getPoints: function(personNumber, callback) {
        contractInstance.methods.getPoints(personNumber).call().then(function(points){
            callback(points, null);
        }).catch((error) => {
            callback(null, "Transaction Reverted");
        });
    }
};

