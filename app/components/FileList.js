// @flow
import React, { Component } from 'react';
import DropZone from '../components/DropZone';
import FileLine from '../components/FileLine';
import styles from './FileList.css';



export default class FileList extends Component {


  constructor() {
    super();
  }

  renderFile(fileInfo) {
    return (
      <FileLine
        key={fileInfo.file.name}
        file={fileInfo.file}
        metadata={fileInfo.metadata}
        thumbnail={fileInfo.thumbnail}
        onClick={() => this.props.onClick(fileInfo)}
        isSelected={fileInfo === this.props.selectedFile}
      />
    );
  }

  render() {
    const listItems = this.props.filesInfo.map((number) =>
      this.renderFile(number)
    );

    return (
      <div>

        <div  className={styles.listContainer}>
           {listItems}
        </div>
        <div>
          <DropZone  onDrop={i => this.props.onDrop(i)}>
            <p>Try dropping some files here.</p>
          </DropZone>
        </div>
      </div>

    );
  }
}
