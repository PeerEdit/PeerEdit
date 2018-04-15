import React from 'react';

class PDFViewer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.resource}</div>
        );
    }

}

export { PDFViewer };
