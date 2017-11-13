//import fire from '../firebase.js';

export const REQUEST_BOOKS = 'REQUEST_BOOKS'
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'

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


export const fetchBooks = () => {
    
        return (dispatch) => {
            //dispatch(requestBooks()) for loading view for example
            
            // ajx of somethins else and callback with dispatch(receiveBooks())
        }
}
