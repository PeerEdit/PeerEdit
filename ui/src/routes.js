/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
function App(props) {
    return (
        <div>
            <h1>Wrapper</h1>
            {props.children}
        </div>
    );
}

function Main(props) {
    return (
        <div>
            <h1>Main Page</h1>
        </div>
    );
}

export default (
    <Route path="/" component={App}>
        <Route path="main" component={Main} />
    </Route>
);
