import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducers from './reducers'

export default function configureStore(preloadedState){
    return createStore(
        rootReducers,
        preloadedState,
        applyMiddleware(thunkMiddleware)
    )
}