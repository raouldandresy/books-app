// read on http://sgeek.org/create-restful-api-using-node-js-express-and-mysql/
// Basic Setup
// install xampp - set root as db and create db called booksapp. 
// send my an email so I send you dump of this fucking db

var http     = require('http'),
    express  = require('express'),
    mysql    = require('mysql')
    parser   = require('body-parser');

var addBook  = require('./addBook.js');

// Database Connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'booksapp'
});

try {
    connection.connect();
} catch(e) {
    console.log('Database Connetion failed:' + e);
}


// Setup express
var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 5000);

// Set default route
app.get('/api/getBooks', function (req, res) {
    
    var jsonBooks = [];
    connection.query('SELECT * FROM books',function(err, rows, field){
        if(!err){
            console.log(rows[0])
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(rows));
        } else {
            res.status(404).send(err);
        }
    })
});

app.post('/api/addBook', function(err,res){ addBook(err, res, connection) });

// Create server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
});