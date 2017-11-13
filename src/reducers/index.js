import { combineReducers } from 'redux'
import { 
    REQUEST_BOOKS,
    RECEIVE_BOOKS
} from '../actions'


const initialState = {
    isFetching: false,
    books: []
}

const booksWrapper = (state = initialState, action) => {
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

// rootReducers is a normal reducers build with list of reducers
const rootReducers = combineReducers({
    booksWrapper
})

export default rootReducers