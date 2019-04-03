var express = require('express');
var Web3 = require('web3');
const Tx = require('ethereumjs-tx');
var config = require('../config.json');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var mongo_url = config.mongo_endpoint;
var web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain_endpoint));

// Get ETH accounts
web3.eth.getAccounts(function(err, accounts){
  console.log(accounts);
});

// Setup contract instance
var contractArtifact = require('../../survey-contract/build/contracts/Survey.json');
var contractInstance = new web3.eth.Contract(contractArtifact.abi, config.contract_address);

// Register User in both MongoDB and Blockchain
function registerUser(personNumber) {

  MongoClient.connect(mongo_url, function(err, db) {

    var dbo = db.db("survey");

    dbo.collection("users").insertOne({'person_number': personNumber}, function(err, res) {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      db.close();
    });
  });

  var abi = contractInstance.methods.registerUser(personNumber).encodeABI();
  signTransaction(abi);

}

function signTransaction(abi) {

  let tx = {
    gas: 1000000,
    data: abi,
    value: 0,
    to: config.contract_address
  }

  var privateKey = Buffer.from(config.private_key, 'hex')
  var transaction = new Tx(tx);

  transaction.sign(privateKey);

  web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
            .on('transactionHash',console.log);

}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getTotalSurveys', function(req, res, next){
  console.log(req.body);

  contractInstance.methods.getSurveyCount(function(req,res){
    console.log("res");
    console.log(res);
  });
  res.sendStatus(200);

});

router.post('/addEntry', function(req, res, next){

  console.log("Add entry",req.body);

  var entry = req.body;

  MongoClient.connect(mongo_url, function(err, db) {

    var dbo = db.db("survey");

    dbo.collection("entries").insertOne(entry, function(err, res) {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      db.close();
    });

  });

  res.sendStatus(200);

});

router.post('/login', function(req, res, next){

  var personNumber = req.body.personNumber;

  // Log in if user exists, else register
  MongoClient.connect(mongo_url, function(err, db) {

    var dbo = db.db("survey");

    dbo.collection("users").findOne({'person_number': personNumber}, function(err, document) {

      if (err) {
        res.sendStatus(500);
        throw err;
      }

      // User not registered, go ahead and register
      if(document == null) {
        console.log("User not found, registering...")
        registerUser(personNumber);
      } 
      db.close();
    });
  });

  res.sendStatus(200);

})

module.exports = router;
