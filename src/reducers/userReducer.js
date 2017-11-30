import { 
    CHECK_LOGIN,
    LOGIN_SUCCES,
    CATCH_LOGOUT
} from '../actions/userAction'

const initialUserState = {
    logged: false,
    userInfo: null
}

const userReducer = (state = initialUserState, action) => {

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

export default userReducer