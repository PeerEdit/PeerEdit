import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { uploadReducer } from './upload';
import { authReducer } from './auth';

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    upload: uploadReducer,
    auth: authReducer,
});

export default rootReducer;