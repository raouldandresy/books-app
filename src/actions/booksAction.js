import books from 'google-books-search';
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
        
    }
}