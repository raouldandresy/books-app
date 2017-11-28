import { combineReducers } from 'redux'
import booksReducer from './booksReducer.js'
import userReducer from './userReducer.js'

// rootReducers is a normal reducers build with list of reducers
const rootReducers = combineReducers({
    userReducer,
    booksReducer
})

export default rootReducers