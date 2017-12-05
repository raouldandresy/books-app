import books from 'google-books-search'


const DEFAULT_OPTIONS = {
    key: "AIzaSyBKIxcQWsno2BFGCfbAx2cFlTsjeW3IT9I",
    offset: 0,
    limit: 10,
    type: 'books',
    order: 'relevance',
    lang: 'it' 
}

const BooksSearch = {

    query(key,options){ /// key will be title,
        
        return new Promise(function(resolve, reject){
            books.search(key, options, function(error, results, apiResponse) {
                if (!error){
                    resolve(results)
                } else {
                    console.log(error);
                    reject(error)
                }
            })
        })
    },

    searchByTitle(title){
        let options = Object.assign({},DEFAULT_OPTIONS,{ field: 'title' })
        return this.query(title, options)
    },

    searchByISBN(isbn){
        let options = Object.assign({},DEFAULT_OPTIONS,{ field: 'isbn' })
        return this.query(isbn, options)
    },
    
}

export default BooksSearch