// @flow
import React, { Component } from 'react';
import ffmpeg  from 'fluent-ffmpeg';
import DropZone from '../components/DropZone';
import FileLine from '../components/FileLine';
import styles from './FileList.css';

function metadataFile(file) {
  return new Promise(function(resolve, reject) {
    ffmpeg.ffprobe(file.path, (err, metadata) => { resolve([file,metadata,err]); });
  })
}

export default class FileList extends Component {


  constructor() {
    super();
    this.state = {
      filesInfo: []
    };
  }

  renderFile(fileInfo) {
    console.log(fileInfo);
    return (
      <FileLine
        key={fileInfo.file.name}
        file={fileInfo.file}
        metadata={fileInfo.metadata}
      />
    );
  }






  render() {


    const listItems = this.props.filesInfo.map((number) =>
      this.renderFile(number)
    );

    return (
      <div>

        <div>
           <table className={styles.files}>
              <tbody>
                <tr>
                  <th>name</th>
                  <th>path</th>
                </tr>
                {listItems}
              </tbody>
           </table>
        </div>
        <div>
          <DropZone  onDrop={i => this.prop.onDrop(i)}>
            <p>Try dropping some files here.</p>
          </DropZone>
        </div>
      </div>

    );
  }
}
