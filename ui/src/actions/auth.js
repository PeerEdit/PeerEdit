import { browserHistory } from 'react-router';

import axios from 'axios';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
} from '../constants/index';

// define API requests
export function create_user(email, password) {
    return axios.post('/api/create_user', {
        email,
        password,
    });
}

export function get_token(email, password) {
    return axios.post('/api/get_token', {
        email,
        password,
    });
}

// define actions
export function loginUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token,
        },
    };
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST,
    };
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
    };
}

export function logoutInPlace() {
    return (dispatch) => {
        dispatch(logout());
    };
}

export function logoutAndRedirect() {
    return (dispatch) => {
        dispatch(logout());
        browserHistory.push('/');
    };
}

export function redirectToRoute(route) {
    return () => {
        browserHistory.push(route);
    };
}

export function loginUser(email, password) {
    return function (dispatch) {
        dispatch(loginUserRequest());
        return get_token(email, password)
            .then(
                response => {
                    try {
                        dispatch(loginUserSuccess(response.data.token));
                    } catch (e) {
                        alert(e);
                        dispatch(loginUserFailure({
                            response: {
                                status: 403,
                                statusText: 'Invalid token',
                            },
                        }));
                    }
                },
                error => {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid username or password',
                        },
                    }));
                }
            );
    };
}

export function registerUserRequest() {
    return {
        type: REGISTER_USER_REQUEST,
    };
}

export function registerUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: REGISTER_USER_SUCCESS,
        payload: {
            token,
        },
    };
}

export function registerUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: REGISTER_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

export function registerUser(email, password) {
    return function (dispatch) {
        dispatch(registerUserRequest());
        return create_user(email, password)
            .then(
                response => {
                    try {
                        dispatch(registerUserSuccess(response.data.token));
                    } catch (e) {
                        dispatch(registerUserFailure({
                            response: {
                                status: 403,
                                statusText: 'Invalid token',
                            },
                        }));
                    }
                },
                error => {
                    dispatch(registerUserFailure({
                        response: {
                            status: 403,
                            statusText: 'User with that email already exists',
                        },
                    }))
                }
            );
    };
}
