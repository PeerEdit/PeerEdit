import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

// persist subset of data in cookies
import reduxCookiesMiddleware from 'redux-cookies-middleware';
import { getStateFromCookies } from 'redux-cookies-middleware';

const debugware = [];
if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger')['createLogger'];

    debugware.push(createLogger({
        collapsed: true,
    }));
}

const cookiePaths = {
    "auth.token": { name: "peeredit_token" },
    "auth.userName": { name: "peeredit_username" },
}

export default function configureStore(initialState) {

    initialState = getStateFromCookies(initialState, cookiePaths);

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            reduxCookiesMiddleware(cookiePaths),
            ...debugware
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index').default;

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
