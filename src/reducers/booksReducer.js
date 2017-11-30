import { 
    REQUEST_BOOKS,
    RECEIVE_BOOKS
} from '../actions/booksAction'

const initialState = {
    isFetching: false,
    books: []
}

const booksReducer = (state = initialState, action) => {
    switch (action.type){
        
        // for async
        case REQUEST_BOOKS:
            return Object.assign({}, state, {
                isFetching: true
            })
        
        // for async
        case RECEIVE_BOOKS:
            return Object.assign({}, state, {
                isFetching: false,
                todos: action.todos
            })

        default:
            return state;
    }
}

export default booksReducer