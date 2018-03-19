import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* global styles for app */
import './styles/app.scss';

class Viewer extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: React.PropTypes.node,
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <section>
                    <div>
                        {this.props.children}
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
}

export { Viewer };
