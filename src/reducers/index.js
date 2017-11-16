import { combineReducers } from 'redux'
import { 
    REQUEST_BOOKS,
    RECEIVE_BOOKS,
    CHECK_LOGIN,
    LOGIN_SUCCES,
    CATCH_LOGOUT
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

const initialUserState = {
    logged: false,
    userInfo: null
}

const userWrapper = (state = initialUserState, action) => {

    switch (action.type){
        case CHECK_LOGIN:
            return {
                logged: false,
                userInfo: action.userInfo
            }
        
        case LOGIN_SUCCES: 
            return {
                logged: true,
                userInfo: action.appUser
            }

        case CATCH_LOGOUT:
            return {
                logged: false,
                userInfo: null
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