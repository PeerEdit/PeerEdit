import {
    REPORT_RESOURCE_URL_REQUEST,
    REPORT_RESOURCE_URL_SUCCESS,
    REPORT_RESOURCE_URL_FAILURE
} from '../constants/index';

import axios from 'axios';

export function reportResourceUrlRequest(url) {
    return {
        type: REPORT_RESOURCE_URL_REQUEST,
        v: {
            url
        }
    };
}

export function reportResourceUrlSuccess(urlobj) {
    return {
        type: REPORT_RESOURCE_URL_SUCCESS,
        v: urlobj
    };
}

export function reportResourceUrlError(errobj) {
    return {
        type: REPORT_RESOURCE_URL_FAILURE,
        v: errobj
    };
}

const tokenConfig = (token) => ({
    headers: {
        'Authorization': token, // eslint-disable-line quote-props
    },
});

export function uploadResourceUrl(url, token) {
    return axios.post(
        '/api/index_new_resource'
        , { url }
        , tokenConfig(token));
}

// redux-thunk
export function sendUrlRequest(url, token) {
    return (dispatch) => {
        dispatch(reportResourceUrlRequest(url));
        uploadResourceUrl(url, token)
            .then(
                response => dispatch(reportResourceUrlSuccess(response)),
                error => dispatch(reportResourceUrlError(error))
            );
    }
}