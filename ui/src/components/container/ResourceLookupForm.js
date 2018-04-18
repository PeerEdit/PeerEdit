import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/resource';

import * as xxhash from 'xxhashjs';
import bigInt from 'big-integer';

function mapStateToProps(state) {
    return {
        inProg: state.resource.inProg,
        resource: state.resource.resourceObj,
        token: state.auth.token,
        userName: state.auth.userName,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

// adapted from [https://stackoverflow.com/questions/14438187/javascript-filereader-parsing-long-file-in-chunks]
function parseFile(file, callback, done) {
    var fileSize   = file.size;
    var chunkSize  = bigInt(64 * 1024); // bytes
    var maxChunksForHash = 1;
    var offset     = bigInt(0);
    var self       = this; // we need a reference to the current object
    let chunkReaderBlock = null;

    function readEventHandler (evt) {
        console.log(offset);

        if (evt.target.error == null) {
            //debugger;
            offset += evt.target.result.byteLength;

            if (evt.target.result.byteLength == 0) {
                done();
                return;
            } else {
                callback(evt.target.result); // callback for handling read chunk
            }
        } else {
            console.log("Read error: " + evt.target.error);
            return;
        }
        // of to the next chunk
        chunkReaderBlock(offset, chunkSize, file);
    }

    chunkReaderBlock = function(_offset, length, _file) {
        var r = new FileReader();
        var blob = _file.slice(_offset, length + _offset);
        r.onload = readEventHandler;
        r.readAsArrayBuffer(blob);
    }

    // now let's start the read with the first block
    chunkReaderBlock(offset, chunkSize, file);
}

class ResourceLookupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: null,
            filesHash: null,
            links: [],
            hashDigests: {}
        };

        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFileInputChange(event) {
        console.log(event.target.files);
        console.log(bigInt);

        let hashes = {};
        let hashDigests = {};
        let numFiles = event.target.files.length;

        for(let i = 0; i < event.target.files.length; i++) {
            let curFile = event.target.files[i];
            let h = xxhash.h64();
            console.log(h.digest().toString(16))
            hashes[curFile] = h;

            console.log(h)
            parseFile(event.target.files[i]
            , (data) => {
                h.update(data)
            }
            , () => {
                hashDigests[curFile] = hashes[curFile].digest().toString(16);
                this.props.getResource(hashDigests[curFile]);
                console.log(numFiles);
                if (Object.keys(hashDigests).length == numFiles) {
                    // all done
                    this.setState({ 
                        hashesCalculated: true,
                        hashDigests: hashDigests
                    })

                    // search db for reported resources.
                    console.log(this.state.hashDigests);
                }
            });
        }
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
                {this.props.resource
                    ? <section>
                        <h3>Links Found</h3>
                        <a href={`/view/${this.props.resource._id}`} target="_blank">Open In PeerEdit</a>
                        <ul>
                            {this.props.resource.links.map((link) => (
                                <li key={link.url}>{link.url}</li>  
                            ))}
                        </ul>
                    </section>
                    : null}
            </div>
        );
    }
}

ResourceLookupForm = connect(mapStateToProps, mapDispatchToProps)(ResourceLookupForm);
export { ResourceLookupForm };