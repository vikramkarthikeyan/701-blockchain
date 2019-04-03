var express = require('express');
var config = require('../config.json');
var router = express.Router();
var mongo = require('../controllers/mongoWrapper');
var blockchain = require('../controllers/blockchainWrapper');

// Register User in both MongoDB and Blockchain
function registerUser(personNumber, callback) {
  mongo.addLoginEntry(personNumber);
  blockchain.getRegisterUserABI(personNumber, function(abi){
    blockchain.signTransaction(abi, function(status){
      callback(status);
    });
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// API to get the total number of Incident records
router.post('/getTotalRecords', function(req, res, next){
  blockchain.getSurveyCount(function(count){
    res.send({"count": count.toNumber()});
  });
});

// API to add an entry of the incident reported
router.post('/addEntry', function(req, res, next){
  mongo.addIncidentEntry(req.body);
});

// API to add user entry status to blockchain
router.post('/entryEligibilityCheck', function(req, res, next){
  blockchain.getSurveyEntryABI(req.body.personNumber, function(abi){
    blockchain.signTransaction(abi, function(status){
      res.sendStatus(status);
    });
  });
});

// API for user login 
router.post('/login', function(req, res, next){
  // Login if entry is available, else register aysnchronously and still login
  mongo.checkLoginEntry(req.body.personNumber, function(response){
    // Register if entry is not present
    if (response== null) {
      registerUser(req.body.personNumber, function(status){
        res.sendStatus(status);
      });
    }
  });
});

module.exports = router;
