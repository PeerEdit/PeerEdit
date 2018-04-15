import {
    ADD_RESOURCE_COMMENT_REQUEST,
    ADD_RESOURCE_COMMENT_SUCCESS,
    ADD_RESOURCE_COMMENT_FAILURE,

    GET_RESOURCE_REQUEST,
    GET_RESOURCE_SUCCESS,
    GET_RESOURCE_FAILURE,
} from '../constants/index';

import axios from 'axios';

// resource 
export function addResourceCommentRequest() {
    return {
        type: ADD_RESOURCE_COMMENT_REQUEST,
    };
}

export function addResourceCommentSuccess(commentObj) {
    return {
        type: ADD_RESOURCE_COMMENT_SUCCESS,
        v: {
            comment: commentObj
        }
    };
}

export function addResourceCommentFailure(error) {
    return {
        type: ADD_RESOURCE_COMMENT_FAILURE,
        v: {
            error: error
        }
    };
}

export function getResourceRequest() {
    return {
        type: GET_RESOURCE_REQUEST,
    };
}

export function getResourceSuccess(resourceObj) {
    return {
        type: GET_RESOURCE_SUCCESS,
        v: {
            resource: resourceObj
        }
    };
}

export function getResourceFailure(error) {
    return {
        type: GET_RESOURCE_FAILURE,
        v: {
            error: error
        }
    };
}

const tokenConfig = (token) => ({
    headers: {
        'Authorization': token, // eslint-disable-line quote-props
    },
});

export function getResourceWithId(id, token) {
    return axios.get(
        '/api/get_resource_from_hash/%s' % id,
        tokenConfig(token));
}

export function addResourceComment(commentObj, resourceId, token) {
    return axios.post(
        '/api/add_comment_to_resource/%s' % resourceId,
        { comment: commentObj },
        tokenConfig(token));
}

// redux-thunk
export function getResource(resourceId, token) {
    return (dispatch) => {
        dispatch(getResourceRequest(resourceId));
        getResourceWithId(url, token)
            .then(
                response => dispatch(getResourceSuccess(response)),
                error => dispatch(getResourceFailure(error))
            );
    };
}

export function addComment(commentObj, resourceId, token) {
    return (dispatch) => {
        dispatch(addResourceCommentRequest(commentObj));
        addResourceComment(commentObj, resourceId, token)
            .then(
                response => dispatch(addResourceCommentSuccess(response)),
                error => dispatch(addResourceCommentFailure(error))
            );
    };
}

