import {
    REPORT_RESOURCE_URL_REQUEST,
    REPORT_RESOURCE_URL_SUCCESS,
    REPORT_RESOURCE_URL_FAILURE
} from '../constants/index';

const initialState = {
    inProg: false,
    uploadedObj: null,
    errors: null
};

export function uploadReducer(state=initialState, action) {
    switch (action.type) {
        case REPORT_RESOURCE_URL_REQUEST:
            return Object.assign({}, state, {
                inProg: true,
                uploadedObj: null,
                errors: null
            });
        case REPORT_RESOURCE_URL_SUCCESS:
            return Object.assign({}, state, {
                inProg: false,
                uploadedObj: action.v
            });
        case REPORT_RESOURCE_URL_FAILURE:
            return Object.assign({}, state, {
                inProg: false,
                errors: action.v
            });
        default:
            console.log("UPLOAD REDUCER FALLTHROUGH");
            console.log(action);
            return state;
    }
}