/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from './containers/App';
import { Viewer } from "./containers/Viewer"
import { Uploader } from './containers/Uploader';
import { HomeContainer } from './containers/HomeContainer';

import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import ProtectedView from './components/ProtectedView';
import Analytics from './components/Analytics';
import NotFound from './components/NotFound';
import Threads from './components/ThreadView';
import PdfViewer from './components/PdfViewer';

import { DetermineAuth } from './components/DetermineAuth';
import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';

export default (
    <Route path="/">
        <Route path="gui/" component={App}>
            <Route path="main" component={requireAuthentication(ProtectedView)} />
            <Route path="login" component={requireNoAuthentication(LoginView)} />
            <Route path="register" component={requireNoAuthentication(RegisterView)} />
            <Route path="home" component={requireNoAuthentication(HomeContainer)} />
            <Route path="analytics" component={requireAuthentication(Analytics)} />
            <Route path="browse" component={requireAuthentication(Threads)} />
        </Route>
        <Route path="viewer/:assetId" component={Viewer} />
        <Route path="upload" component={Uploader} />
        <Route path="*" component={DetermineAuth(NotFound)} />
    </Route>
);
