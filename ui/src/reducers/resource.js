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

const initialState = {
    inProg: false,
    resourceObj: null,
    errors: null,

    fetchingComments: false,
    commentsErrors: null,
    resourceComments: [],
};

export function resourceReducer(state=initialState, action) {
    switch (action.type) {

        // handle resource load
        case GET_RESOURCE_REQUEST:
            return Object.assign({}, state, {
                inProg: true
            });
        case GET_RESOURCE_SUCCESS:
            return Object.assign({}, state, {
                inProg: false,
                resourceObj: action.v.resourceObj,
            });
        case GET_RESOURCE_FAILURE:
            return Object.assign({}, state, {
                inProg: false,
                resourceObj: null,
                errors: action.v
            });

        // handle resource comments load
        case GET_RESOURCE_COMMENTS_REQUEST:
            return Object.assign({}, state, {
                fetchingComments: true,
                resourceComments: [],
                commentsErrors: null,
            });

        case GET_RESOURCE_COMMENTS_SUCCESS:
            return Object.assign({}, state, {
                fetchingComments: false,
                commentsErrors: null,
                resourceComments: action.v.resourceComments,
            });

        case GET_RESOURCE_COMMENTS_FAILURE:
            return Object.assign({}, state, {
                fetchingComments: false,
                commentsErrors: action.v.error,
                resourceComments: [],
            });

        // handle add comments
        case ADD_RESOURCE_COMMENT_REQUEST:
            return Object.assign({}, state, {
                inProg: true
            });
        case ADD_RESOURCE_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                inProg: false,
                resourceComments: action.v.resourceComments
            });
        case ADD_RESOURCE_COMMENT_FAILURE:
            return Object.assign({}, state, {
                inProg: false,
                errors: action.v
            });

        default:
            return state;
    }
}