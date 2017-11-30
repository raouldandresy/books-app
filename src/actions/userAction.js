import fire from '../firebase.js';
import firebase from 'firebase'
export const CHECK_LOGIN = 'CHECK_LOGIN'    
export const LOGIN_SUCCES = 'LOGIN_SUCCES'          // calback
export const CATCH_LOGOUT = 'CATCH_LOGOUT'          // callback
export const CHECK_LOGOUT = 'CHECK_LOGOUT'

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

