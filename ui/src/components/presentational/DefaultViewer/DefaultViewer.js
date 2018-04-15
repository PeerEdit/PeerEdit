import React from 'react';

class DefaultViewer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.resource}</div>
        );
    }

}

export { DefaultViewer };