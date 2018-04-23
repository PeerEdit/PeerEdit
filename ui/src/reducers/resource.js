import {
    ADD_RESOURCE_COMMENT_REQUEST,
    ADD_RESOURCE_COMMENT_SUCCESS,
    ADD_RESOURCE_COMMENT_FAILURE,

    GET_RESOURCE_REQUEST,
    GET_RESOURCE_SUCCESS,
    GET_RESOURCE_FAILURE,
} from '../constants/index';

const initialState = {
    inProg: false,
    resourceObj: null,
    resourceComments: null,
    errors: null
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
                resourceComments: action.v.resourceComments
            });
        case GET_RESOURCE_FAILURE:
            return Object.assign({}, state, {
                inProg: false,
                resourceObj: null,
                resourceComments: null,
                errors: action.v
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