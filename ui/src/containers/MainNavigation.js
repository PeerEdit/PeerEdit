import React from 'react';

import { ResourceLookupForm } from '../components/container/ResourceLookupForm';
import { ResourceUploadForm } from '../components/container/ResourceUploadForm';
import { LoginOrRegisterModal } from '../components/presentational/LoginOrRegisterModal';

class MainNavigation extends React.Component {
    render() {
        return (
            <div>
                <h1>PeerEdit Main Navigation</h1>
                <section>
                    <h2>Lookup Form</h2>
                    <ResourceLookupForm />
                </section>
                <section>
                    <h2>Report New Resource</h2>
                    <p>Help advance the collection of new knowledge! Report
                       a new resource</p>
                    <ResourceUploadForm />
                </section>
                <section>
                    <h2>About PeerEdit</h2>
                </section>
                <section>
                    <h2>Sign In Below</h2>
                    <LoginOrRegisterModal />
                </section>
            </div>
        );
    }
}

export { MainNavigation };