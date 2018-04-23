import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/configureStore';
import rootReducer from './reducers';
import { INITIALIZE_STORE } from "./constants/";
import routes from './routes';
import './style.scss';

injectTapEventPlugin();

const store = configureStore(rootReducer({}, {type: INITIALIZE_STORE}));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Redirect from="/" to="main" />
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);
