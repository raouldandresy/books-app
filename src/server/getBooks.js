// return object like { books: {id,title,author} }
module.exports = function getBooksHelper(req, res, connection){
    
            connection.query('SELECT * FROM books',function(err, rows, field){
                if(!err){
                    console.log(rows[0])
                    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify(rows));
                } else {
                    res.status(404).send(err);
                }
            })
    
    }