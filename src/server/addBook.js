
// return object like { inserted: true, book: {id,title,auhtor} }
module.exports = function addBookHelper(req, res, connection){

	var response = {}
	console.log('--------------------------------------------------')
	
	var a;
    try{
        a = JSON.parse(Object.keys(req.body)[0])
    }catch(err){
        a = req.body
    }
    console.log(a);

	
    if (typeof a.title !== 'undefined' && typeof a.author !== 'undefined') {
		
		
        var book = {
            title: a.title,
            author: a.author
        }
		
		console.log('try insert book: ',book);
		connection.query('INSERT INTO books (id,title, author) VALUES (?, ?, ?)', 
			[null,book.title, book.author], 
			function(err, result) {

		  		if (!err){

					console.log('ok insert query');
					
					
					if (result.affectedRows != 0) {
                        book.id = result.insertId;
                        response = book;
					} else {
						response = { error: err };
					}
					
					res.header('Content-Type', 'application/json');
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