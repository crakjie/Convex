// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './FileMetadata.css';
import FileSize from '../components/FileSize';

function fileMetadataLine(label, value) {
  return(
    <tr>
      <td>{label}</td><td>{value}</td>
    </tr>
  );
}

function fileMetadataSeparator(label) {
  return(
    <tr>
      <td>{label}</td>
    </tr>
  );
}

function renderTablePart(table) {
  return [
    fileMetadataLine(table.label),
    table.lines.map((line) => fileMetadataLine(line.label,line.value))
  ];
}

export default function FileMetadata(props) {

      const tableContent = props.tables.map(x => renderTablePart(x));
      return (
        <div className={styles.container} >
          <table>
            <tbody>
              {tableContent}
            </tbody>
          </table>
        </div>);


}

