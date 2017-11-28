import fire from '../firebase.js';
import firebase from 'firebase'

export const REQUEST_BOOKS = 'REQUEST_BOOKS'
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'        // callback
export const CHECK_LOGIN = 'CHECK_LOGIN'    
export const LOGIN_SUCCES = 'LOGIN_SUCCES'          // calback
export const CATCH_LOGOUT = 'CATCH_LOGOUT'          // callback
export const CHECK_LOGOUT = 'CHECK_LOGOUT'
export const TRY_INSERT_NEW_BOOK = 'TRY_INSERT_NEW_BOOK'

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

const _checkSilentLoginSessionSucces = (userInfo) => {
    return {
        type: LOGIN_SUCCES,
        userInfo
    }
}

const _loginSucces = (user) => {

    const appUser = {
        name: user.displayName,
        img: user.photoURL
    }
    
    return {
        type: LOGIN_SUCCES,
        appUser
    }
}

const _catchLogout = () => {
    return {
        type: CATCH_LOGOUT
    }
}

const _succesInsertNewBook = (book) => {
    return {
        type: TRY_INSERT_NEW_BOOK,
        book
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
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function(){
                fire.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    dispatch(_loginSucces(user,'FACEBOOK'))
                    
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    
                });
            })
    }
}

export const silentLogin = () => {

    return (dispatch) => {
        var currentUser = fire.auth().currentUser;
        if(currentUser)
            dispatch(_loginSucces(currentUser))
    }
}

export const catchLogout = () => {
    return (dispatch) => {
        dispatch(_catchLogout())
    }
}

export const checkLogout = () => {

    return (dispatch) => {
        return fire.auth().signOut()
            .then(function(user){
                dispatch(_catchLogout())
            })
            .catch(function(error){
                console.error(error)
            })
    }

}

export const tryInsertNewBook = (book) => {
    
    return (dispatch) => {

        //console.log(book.title,book.author)
        const payload = {
            title: "un titolo a caso",
            author: "un autore a caso"
        };
        let data = new FormData();
        data.append( "json", JSON.stringify(payload));
        
        var obj = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Accept': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode : 'no-cors',
          };
        return fetch('http://localhost:5000/api/addBook',obj).then(function(response) {
            
            const contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")){
                debugger;
                return response.json();
            }
            
            return response.json();
            throw new TypeError("Oops, we haven't got JSON!");
        })
        .then(function(bookJson) { 
            debugger
            dispatch(_succesInsertNewBook(bookJson))
        }.bind(this))
        .catch(function(error) {
            debugger
            //console.error(error); 
        }); 
    }
}

