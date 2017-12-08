var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://dev:dev@ds133476.mlab.com:33476/heroku_d51qbvdk";

module.exports = function GetBooks(){

    return new Promise(function(resolve,reject){
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
              
            var dbase = db.db("heroku_d51qbvdk");
            var mynewcollection = dbase.collection('mynewcollection');
            mynewcollection.find().toArray(function(err, items) {
                if (err) {
                  //reject(err);
                  db.close();
                  reject(err);
                } else {
                  db.close();
                  resolve(items);
                }          
              });
          }); 
    })
};