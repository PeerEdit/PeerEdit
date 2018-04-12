import React from 'react';

import * as xxhash from 'xxhashjs';
import bigInt from 'big-integer';

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
                console.log(numFiles);
                if (Object.keys(hashDigests).length == numFiles) {
                    // all done
                    this.setState({ 
                        hashesCalculated: true,
                        hashDigests: hashDigests
                    })
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