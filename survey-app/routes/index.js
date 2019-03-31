var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addEntry', function(req, res, next){

  console.log("Add entry",req.body);

  var entry = req.body;

  MongoClient.connect(url, function(err, db) {

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

router.post('/registerUser', function(req, res, next){

  console.log("Register User",req.body);

  var entry = req.body;

  MongoClient.connect(url, function(err, db) {

    var dbo = db.db("survey");

    dbo.collection("users").insertOne(entry, function(err, res) {
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

  MongoClient.connect(url, function(err, db) {

    var dbo = db.db("survey");

    dbo.collection("users").find({'person_number': personNumber}, function(err, res) {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      console.log(res);
      db.close();
    });

  });

  res.sendStatus(200);

})

module.exports = router;
