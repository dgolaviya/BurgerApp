import * as actions from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

export const authSuccess = (userId, idToken) => {
    return {
        type: actions.AUTH_SUCCESS,
        token: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actions.AUTH_LOGOUT
    }
}
export const setAuthRedirectPath = (path) => {
    return {
        type: actions.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
export const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiresIn * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDWEo5VhfB4tuoLWeKLn38_VkxXHRqKcYE';
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDWEo5VhfB4tuoLWeKLn38_VkxXHRqKcYE'
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.localId, response.data.idToken));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationTime'))
            if (expirationDate <= new Date()) {
                dispatch(authLogout())
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(userId,token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}