import fire from '../firebase.js';

export const REQUEST_BOOKS = 'REQUEST_BOOKS'
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'
export const CHECK_LOGIN = 'CHECK_LOGIN'

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


export const fetchBooks = () => {
    
        return (dispatch) => {
            //dispatch(requestBooks()) for loading view for example
            
            // ajx of somethins else and callback with dispatch(receiveBooks())
        }
}

export const checkLogin = () => {
    return (dispatch) => {

        debugger
        var f = fire;
        var provider = f.auth.FacebookAuthProvider();
        fire.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
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
