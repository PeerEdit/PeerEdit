import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { uploadReducer } from './upload';
import { authReducer } from './auth';
import { resourceReducer } from './resource';

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    upload: uploadReducer,
    auth: authReducer,
    resource: resourceReducer,
});

export default rootReducer;