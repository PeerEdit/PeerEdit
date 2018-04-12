/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';
import { MainNavigation } from './containers/MainNavigation';

export const App = (props) => (
    <div>
        {props.children}
    </div>
);

export default (
    <Route path="/" component={App}>
        <Route path="main" component={MainNavigation} />
    </Route>
);
