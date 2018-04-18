import React from 'react';

class DefaultViewer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{JSON.stringify(this.props.resource)}</div>
        );
    }

}

export { DefaultViewer };