/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';
import { MainNavigation } from './containers/MainNavigation';
import { ResourceViewer } from './containers/ResourceViewer';

export const App = (props) => (
    <div>
        {props.children}
    </div>
);

export default (
    <Route path="/" component={App}>
        <Route path="main" component={MainNavigation} />
        <Route path="view/:resourceId" component={ResourceViewer} />
    </Route>
);
