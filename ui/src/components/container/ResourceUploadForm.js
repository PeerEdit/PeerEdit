import React from 'react';

class ResourceUploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ""
        };

        this.handleUrlInputChange = this.handleUrlInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUrlInputChange(event) {
        console.log(event.target.value);
        this.setState( {"url": event.target.value} );
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.url} onChange={this.handleUrlInputChange} />
                </form>
            </div>
        );
    }
}

export { ResourceUploadForm };