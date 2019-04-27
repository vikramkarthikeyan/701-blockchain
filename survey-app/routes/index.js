var express = require('express');
var mongo = require('../controllers/mongoWrapper');
var blockchain = require('../controllers/blockchainWrapper');
var path = require('path');

var router = express.Router();

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
        console.log("\nUser not found..creating user");

        registerUser(req.body.personNumber, function(status){
          if(status == 200){
            return res.redirect('/dashboard');
          } else {
            res.sendStatus(status);
          }      
        });

    } else {

      res.redirect('/dashboard');

    }

  });

});

// API to get points for user
router.post('/getPoints', function(req, res, next){
  blockchain.getPoints(req.body.personNumber, function(points, err){
    if(!err)
      res.send({"points": points});
    else
      res.sendStatus(500);
  });
});

module.exports = router;
