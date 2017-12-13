var express = require('express');
var app = express();

var GetBooks = require('./get/books.js');
var InsertBook = require('./post/insertbook.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.get('/books', function (req, res) {

    GetBooks()
        .then(function(items){
            console.log(items);
            res.send(items);
        })
        .catch(function(err){
            console.log(err);
            res.send(err);
        })

    
});

app.get('/insertbook', function (req, res) {
    
        InsertBooks()
            .then(function(items){
                console.log(items);
                res.send(items);
            })
            .catch(function(err){
                console.log(err);
                res.send(err);
            })
    
        
    });

app.listen(3002, function () {
    console.log('app listening on port 3002');
});