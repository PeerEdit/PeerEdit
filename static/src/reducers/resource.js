import jwtDecode from 'jwt-decode';

import { createReducer } from '../utils/misc';

import {
    FETCH_RESOURCE_METADATA_REQUEST,
    FETCH_RESOURCE_METADATA_SUCCESS,
    FETCH_RESOURCE_METADATA_FAILURE,
    INDEX_RESOURCE_REQUEST,
    INDEX_RESOURCE_SUCCESS,
    INDEX_RESOURCE_FAILURE
} from '../constants/index';

const initialState = {
    activeResource: null,
    isLoading: false,
    resourceList: false,
    loaded: false,
};

export default createReducer(initialState, {
    [FETCH_RESOURCE_METADATA_REQUEST]: (state, hashval) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [FETCH_RESOURCE_METADATA_SUCCESS]: (state, resource) =>
        Object.assign({}, state, {
            activeResource: resource
        }),
    [FETCH_RESOURCE_METADATA_FAILURE]: (state, hashval) =>
        Object.assign({}, state, {
            isFetching: true,
        }),


    [INDEX_RESOURCE_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [INDEX_RESOURCE_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [INDEX_RESOURCE_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
});
