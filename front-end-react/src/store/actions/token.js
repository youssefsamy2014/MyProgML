import axios from '../../axios-order';
import * as actionTypes from './actionsType';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            console.log('checkAuthTimeout error here')
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (payload) => {
    return dispatch => {
        dispatch(authStart());
        let url ='/Log-in';
        axios.post(url, payload)
            .then(response => {
                console.log(response.data.error)
                const exp = parseInt(response.data.auth.expIn, 10);
                const expirationDate = new Date(new Date().getTime() + exp * 1000);
                localStorage.setItem('token', response.data.auth.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.auth.userID);
                dispatch(authSuccess(response.data.auth.token, response.data.auth.userID));
                dispatch(checkAuthTimeout( response.data.auth.expIn *1000));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        console.log("authCheckState error here")
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};