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

var filterAsync = (array, filter) =>
  Promise.all(array.map(entry => filter(entry)))
  .then(bits => array.filter(entry => bits.shift()));



export default class FileList extends Component {


  constructor() {
    super();
    this.state = {
      files: []
    };
  }

  renderFile(file) {

    return (
      <FileLine
        key={file.file.name}
        file={file.file}
      />
    );
  }



  handleDrop(newfiles) {
    //add metadata and error to files in a tuple [file, metadata, err]
    const filteredFile = newfiles.map(metadataFile);

    Promise.all(filteredFile).then((list) => {
      console.log(list)
      //remove errors and put files and metadata in an object
      const rightFiles = list.filter( mf => mf[2] == null ).map( x => {
        return {
          file: x[0],
          metadata: x[1]
        };
      });

      this.setState({
        files : this.state.files.concat(rightFiles)
      })
    })
  }


  render() {


    const listItems = this.state.files.map((number) =>
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
          <DropZone  onDrop={i => this.handleDrop(i)}>
            <p>Try dropping some files here.</p>
          </DropZone>
        </div>
      </div>

    );
  }
}
