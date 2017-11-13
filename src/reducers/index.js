import { combineReducers } from 'redux'
import { 
    REQUEST_BOOKS,
    RECEIVE_BOOKS,
    CHECK_LOGIN
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

const userWrapper = (state = {}, action) => {
    switch (action.type){
        case CHECK_LOGIN:
            return {
                logged: true,
                userInfo: action.userInfo
            }

        default:
            return state
    }
}

// rootReducers is a normal reducers build with list of reducers
const rootReducers = combineReducers({
    booksWrapper,
    userWrapper
})

export default rootReducers