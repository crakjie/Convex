// @flow
import React, { Component } from 'react';
import ffmpeg  from 'fluent-ffmpeg';
import DropZone from '../components/DropZone';
import FileLine from '../components/FileLine';
import styles from './FileList.css';

function checkFile(file) {
  let isOk = true;
  ffmpeg.ffprobe(file.path, (err) => { console.log(1); isOk = err == null; });
  console.log(2);
  return isOk;
}

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
        key={file.name}
        file={file}
      />
    );
  }



  handleDrop(newfiles) {
    newfiles.forEach((f) => console.log(checkFile(f)));
    const filteredFile = newfiles.filter(checkFile);
      console.log(filteredFile);
    this.setState({
      files : this.state.files.concat(filteredFile)
    });

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
