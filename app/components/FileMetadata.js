// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './FileMetadata.scss';
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
      <th colSpan="2" scope="colgroup">{label}</th>
    </tr>
  );
}

function renderTablePart(table) {
  return [
    fileMetadataSeparator(table.label),
    table.lines.map((line) => fileMetadataLine(line.label, line.value))
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

