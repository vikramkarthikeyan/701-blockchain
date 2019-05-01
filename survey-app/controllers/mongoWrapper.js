var config = require('../config.json');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var objectId = new ObjectID();

var mongo_url = config.mongo_endpoint;


module.exports = {

    checkLoginEntry: function(personNumber, callback){

        MongoClient.connect(mongo_url, function(err, db) {

            var dbo = db.db("reporting");

            dbo.collection("users").findOne({'person_number': personNumber}, function(err, document) {
                if (err) {
                    res.sendStatus(500);
                    throw err;
                }
                db.close();
                callback(document);
            });
        });

    },

    addLoginEntry: function(personNumber){

        MongoClient.connect(mongo_url, function(err, db) {

            var dbo = db.db("reporting");

            dbo.collection("users").insertOne({'person_number': personNumber}, function(err, res) {
                if (err) {
                    res.sendStatus(500);
                    throw err;
                }
                db.close();
            });
        });

    },

    addIncidentEntry: function(entry, callback){

        MongoClient.connect(mongo_url, function(err, db) {

            var dbo = db.db("reporting");

            entry.custom_id = new ObjectID();
        
            dbo.collection("entries").insertOne(entry, function(err, res) {
              callback(res.insertedId);
              if (err) {
                res.sendStatus(500);
                throw err;
              }
              db.close();
            });
        });

    },

    getAllIncidents: function(callback){
        MongoClient.connect(mongo_url, function(err, db) {
            var dbo = db.db("reporting");

            dbo.collection("entries").find({}).toArray(function(err, res){
                if (err) {
                    res.sendStatus(500);
                    throw err;
                }
                db.close();
                callback(res);
            });
        });
    },

    getUserEntries: function(personNumber, callback){
        MongoClient.connect(mongo_url, function(err, db) {
            var dbo = db.db("reporting");

            dbo.collection("entries").find({'personNumber': personNumber}).toArray(function(err, res){
                if (err) {
                    res.sendStatus(500);
                    throw err;
                }
                db.close();
                callback(res);
            });
        });
    },

};