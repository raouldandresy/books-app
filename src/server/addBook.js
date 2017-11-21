
// return object like { inserted: true, book: {id,title,auhtor} }
module.exports = function addBookHelper(req, res, connection){

    var response = {}

    console.log(req.body)
    if (typeof req.body.title !== 'undefined' && typeof req.body.author !== 'undefined') {

        var book = {
            title: req.body.title,
            author: req.body.author
        }
                         
		connection.query('INSERT INTO books (id,title, author) VALUES (?, ?, ?)', 
			[null,book.title, book.author], 
			function(err, result) {

		  		if (!err){
 
					if (result.affectedRows != 0) {
                        book.id = result.insertId;
                        response = book;
					} else {
						response = { error: err };
					}
 
					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				    res.status(400).send(err);
			  	}
			});
 
	} else {
        response = [];
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}

}