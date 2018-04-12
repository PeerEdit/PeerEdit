import React from 'react';

class ResourceLookupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: null,
            filesHash: null,
            links: []
        };

        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFileInputChange(event) {
        console.log(event.target.files);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='file' onChange={this.handleFileInputChange} />
                </form>
                {this.state.links.length > 0 
                    ? <section>
                        <h3>Links Found</h3>
                        <ul>
                            {this.state.links.map((link) => (
                                <li id={link.id}>{link.url}</li>  
                            ))}
                        </ul>
                    </section> 
                    : null}
            </div>
        );
    }
}

export { ResourceLookupForm };