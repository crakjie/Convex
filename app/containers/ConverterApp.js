// @flow
import React, { Component } from 'react';
import FileList from '../components/FileList';
import FileMetadata from '../components/FileMetadata';

export default class ConverterApp extends Component {
  constructor() {
    super();
    this.state = {
      filesInfo: [],
      selectedFile: null
    };
  }

handleDrop(newfiles) {
    //add metadata and error to files in a tuple [file, metadata, err]
    const filteredFile = newfiles.map(metadataFile);

    Promise.all(filteredFile).then((list) => {
      //remove errors and put files and metadata in an object
      const rightFiles = list.filter( mf => mf[2] == null ).map( x => {
        return {
          file: x[0],
          metadata: x[1]
        };
      });

      this.setState({
        filesInfo : this.state.filesInfo.concat(rightFiles)
      })
    })
  }

  render() {
    return (
      <div>
        <FileList
          filesInfo={this.state.filesInfo}
          onDrop={i => this.prop.handleDrop(i)}
        />
        <FileMetadata
          fileInfo={this.state.selectedFile}
        />
      </div>
    );
  }
}
