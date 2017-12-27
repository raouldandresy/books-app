var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://dev:dev@ds133476.mlab.com:33476/heroku_d51qbvdk";

module.exports = function InsertBook(doc){

    var book = doc.book,
        state = doc.state,
        owner = doc.owner;

    console.log('inserbook module receive')
    console.log(doc);

    return new Promise(function(resolve,reject){
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
              
            var dbase = db.db("heroku_d51qbvdk");
            var booksCollection = dbase.collection('books');
            booksCollection.insertOne(doc, function(err, res) {
                if (err) {
                  db.close();
                  reject({ succes: false, err: err });
                } else {
                  db.close();
                  resolve({ succes: true });
                }          
              });
          }); 
    })
};