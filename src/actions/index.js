import fire from '../firebase.js';
import firebase from 'firebase'

export const REQUEST_BOOKS = 'REQUEST_BOOKS'
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'
export const CHECK_LOGIN = 'CHECK_LOGIN'
export const LOGIN_SUCCES = 'LOGIN_SUCCES'

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

const _checkLogin = (userInfo) => {
    return {
        type: CHECK_LOGIN,
        userInfo
    }
}

const _loginSucces = (user, provider = 'FACEBOOK') => {

    switch(provider){
        case 'FACEBOOK': {
            const appUser = {
                name: user.displayName,
                img: user.photoURL
            }
            return {
                type: LOGIN_SUCCES,
                appUser
            }
        }
        
        default:
            return {
                type: LOGIN_SUCCES,
                user: {}
            }
    }

}


export const fetchBooks = () => {
    
        return (dispatch) => {
            //dispatch(requestBooks()) for loading view for example
            
            // ajx of somethins else and callback with dispatch(receiveBooks())
        }
}

export const checkLogin = () => {
    return (dispatch) => {

        var provider = new firebase.auth.FacebookAuthProvider();
        fire.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            dispatch(_loginSucces(user,'FACEBOOK'))
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
}
