// @flow
import React, { Component } from 'react';
import ffmpeg  from 'fluent-ffmpeg';
import FileList from '../components/FileList';
import FileMetadata from '../components/FileMetadata';
import styles from '../containers/wrapper.scss';

function metadataFile(file) {
  return new Promise(function(resolve, reject) {
    ffmpeg.ffprobe(file.path, (err, metadata) => { resolve([file,metadata,err]); });
  })
}

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

  handleClick(file) {
    this.setState({
        selectedFile : file
    })
  }

  render() {
    return (
      <div className={styles.wrapper} >
        <div className={styles.fileList} >
          <FileList
              filesInfo={this.state.filesInfo}
              onDrop={i => this.handleDrop(i)}
              onClick={i => this.handleClick(i)}
          />
        </div>
        <div className={styles.fileMetadata} >
          <FileMetadata
            fileInfo={this.state.selectedFile}
          />
        </div>
      </div>
    );
  }
}
