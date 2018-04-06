import { browserHistory } from 'react-router'

import {
    FETCH_RESOURCE_METADATA_REQUEST,
    FETCH_RESOURCE_METADATA_SUCCESS,
    FETCH_RESOURCE_METADATA_FAILURE,
    INDEX_RESOURCE_REQUEST,
    INDEX_RESOURCE_SUCCESS,
    INDEX_RESOURCE_FAILURE
} from '../constants/index';
import { parseJSON } from '../utils/misc';
import { get_resource_details } from '../utils/resource_functions';

import { get_resource_metadata } from '../utils/http_functions';

// fetch resource actions
export const fetchResourceMetadataRequest = hashval => ({
    return {
        type: FETCH_RESOURCE_METADATA_REQUEST,
        hashval
    };
});

export const fetchResourceMetadataSuccess = resource => ({
    return {
        type: FETCH_RESOURCE_METADATA_SUCCESS,
        resource
    };
});

export const fetchResourceMetadataFailure = error => ({
    return {
        type: FETCH_RESOURCE_METADATA_FAILURE,
        error
    };
});

export function fetchResourceMetadata(hashval) {
    return (dispatch) => {
        dispatch(fetchResourceMetadataRequest(hashval));
        get_resource_metadata(hashval)
            .then(parseJSON)
            .then(response => { 
                dispatch(fetchResourceMetadataSuccess(response.result));
            })
            .catch(error => {
                dispatch(fetchResourceMetadataFailure(error));
            })
    }
}

// index resource actions
export const indexResourceRequest = url => ({
    return {
        type: INDEX_RESOURCE_REQUEST,
        url
    }
});

// index resource actions
export const indexResourceSuccess = resource => ({
    return {
        type: INDEX_RESOURCE_SUCCESS,
        resource
    }
});

// index resource actions
export const indexResourceFailure = error => ({
    return {
        type: INDEX_RESOURCE_FAILURE,
        error
    }
});












