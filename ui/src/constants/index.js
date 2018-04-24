// init store to default values so tree is constructed
export const INITIALIZE_STORE = 'INITIALIZE_STORE';

// action types for reporting resources
export const REPORT_RESOURCE_URL_REQUEST = 'REPORT_RESOURCE_URL_REQUEST';
export const REPORT_RESOURCE_URL_SUCCESS = 'REPORT_RESOURCE_URL_SUCCESS';
export const REPORT_RESOURCE_URL_FAILURE = 'REPORT_RESOURCE_URL_FAILURE';

// action types for login and user creation
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGOUT_USER = 'LOGOUT_USER';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';

// action types for interacting with resources
export const ADD_RESOURCE_COMMENT_REQUEST = 'ADD_RESOURCE_COMMENT_REQUEST';
export const ADD_RESOURCE_COMMENT_SUCCESS = 'ADD_RESOURCE_COMMENT_SUCCESS';
export const ADD_RESOURCE_COMMENT_FAILURE = 'ADD_RESOURCE_COMMENT_FAILURE';

export const GET_RESOURCE_REQUEST = 'GET_RESOURCE_REQUEST';
export const GET_RESOURCE_SUCCESS = 'GET_RESOURCE_SUCCESS';
export const GET_RESOURCE_FAILURE = 'GET_RESOURCE_FAILURE';

export const GET_RESOURCE_COMMENTS_REQUEST = 'GET_RESOURCE_COMMENTS_REQUEST';
export const GET_RESOURCE_COMMENTS_SUCCESS = 'GET_RESOURCE_COMMENTS_SUCCESS';
export const GET_RESOURCE_COMMENTS_FAILURE = 'GET_RESOURCE_COMMENTS_FAILURE';