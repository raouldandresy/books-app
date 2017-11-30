export const REQUEST_BOOKS = 'REQUEST_BOOKS'
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'        // callback
export const TRY_INSERT_NEW_BOOK = 'TRY_INSERT_NEW_BOOK'

const requestBooks = () => {
    return {
        type: REQUEST_BOOKS
    }
}

const receiveBooks = (todos) => {
    return {
        type: RECEIVE_BOOKS,
        todos
    }
}


const _succesInsertNewBook = (book) => {
    return {
        type: TRY_INSERT_NEW_BOOK,
        book
    }
}

export const fetchBooks = () => {
    
        return (dispatch) => {
            //dispatch(requestBooks()) for loading view for example
            
            // ajx of somethins else and callback with dispatch(receiveBooks())
        }
}

export const tryInsertNewBook = (book) => {
    
    return (dispatch) => {

        //console.log(book.title,book.author)
        const payload = {
            title: "un titolo a caso",
            author: "un autore a caso"
        };
        let data = new FormData();
        data.append( "json", JSON.stringify(payload));
        
        var obj = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Accept': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode : 'no-cors',
          };
        return fetch('http://localhost:5000/api/addBook',obj).then(function(response) {
            
            const contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")){
                debugger;
                return response.json();
            }
            
            return response.json();
            throw new TypeError("Oops, we haven't got JSON!");
        })
        .then(function(bookJson) { 
            debugger
            dispatch(_succesInsertNewBook(bookJson))
        }.bind(this))
        .catch(function(error) {
            debugger
            //console.error(error); 
        }); 
    }
}