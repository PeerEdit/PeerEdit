import {
    ADD_RESOURCE_COMMENT_REQUEST,
    ADD_RESOURCE_COMMENT_SUCCESS,
    ADD_RESOURCE_COMMENT_FAILURE,

    GET_RESOURCE_COMMENTS_REQUEST,
    GET_RESOURCE_COMMENTS_SUCCESS,
    GET_RESOURCE_COMMENTS_FAILURE,

    GET_RESOURCE_REQUEST,
    GET_RESOURCE_SUCCESS,
    GET_RESOURCE_FAILURE,
} from '../constants/index';

import axios from 'axios';

// resource 
export function addResourceCommentRequest(isReply=false) {
    return {
        type: ADD_RESOURCE_COMMENT_REQUEST,
        v: {
            isReply
        }
    };
}

export function addResourceCommentSuccess(response) {
    return {
        type: ADD_RESOURCE_COMMENT_SUCCESS,
        v: {
            resourceComments: response.data
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

export function getResourceCommentsRequest() {
    return {
        type: GET_RESOURCE_COMMENTS_REQUEST,
    };
}

export function getResourceCommentsSuccess(comments) {
    return {
        type: GET_RESOURCE_COMMENTS_SUCCESS,
        v: {
            resourceComments: comments
        }
    };
}

export function getResourceCommentsFailure(error) {
    return {
        type: GET_RESOURCE_COMMENTS_FAILURE,
        v: {
            error: error
        }
    }
}

export function getResourceRequest(resourceId) {
    return {
        type: GET_RESOURCE_REQUEST,
        v: {
            resourceId
        }
    };
}

export function getResourceSuccess(resourceObj, resourceComments=null) {
    return {
        type: GET_RESOURCE_SUCCESS,
        v: {
            resourceObj: resourceObj,
            resourceComments: resourceComments
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
    if (token) {
        return axios.get(
            `/api/get_resource_from_hash/${id}`,
            tokenConfig(token));
    }
    else {
        return axios.get(
            `/api/get_resource_from_hash/${id}`);
    }
}

export function getResourceCommentsWithId(id, token) {
    if (token) {
        return axios.get(
            `/api/get_comments_from_hash/${id}`,
            tokenConfig(token));
    }
    else {
        return axios.get(
            `/api/get_comments_from_hash/${id}`);
    }
}
export function addResourceComment(commentObj, token) {
    return axios.post(
        '/api/add_comment',
        {
            comment: commentObj
        },
        tokenConfig(token));
}

export function addResourceCommentReply(commentObj, token, replyTo) {
    return axios.post(
        '/api/add_comment_reply',
        {
            comment: commentObj,
            replyToCommentWithId: replyTo,
        },
        tokenConfig(token));
}

// redux-thunk
export function getResource(resourceId, token) {
    return (dispatch) => {
        dispatch(getResourceRequest(resourceId));
        getResourceWithId(resourceId, token)
            .then(
                response => dispatch(getResourceSuccess(response.data)),
                error => dispatch(getResourceFailure(error))
            );
        dispatch(getResourceCommentsRequest(resourceId));
        getResourceCommentsWithId(resourceId, token)
            .then(
                response => dispatch(getResourceCommentsSuccess(response.data)),
                error => dispatch(getResourceCommentsFailure(error))
            );
    };
}

export function addComment(commentObj, token, isReply=false, replyTo) {
    return (dispatch) => {
        dispatch(addResourceCommentRequest(isReply));

        let commPromise = (! isReply) ? addResourceComment(commentObj, token)
                                      : addResourceCommentReply(commentObj, token, replyTo);
        commPromise.then(
                response => dispatch(addResourceCommentSuccess(response)),
                error => dispatch(addResourceCommentFailure(error))
            );
    };
}

