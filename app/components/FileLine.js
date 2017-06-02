// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './FileLine.scss';
/* <div  className={styles.container}  data-tid="container">*/
/* </div>*/
export default function FileLine(props) {
  return (
    <tr onClick={props.onClick} className={(props.isSelected ? styles.selected : styles.notselected)}>
      <td>{props.file.name}</td>
      <td>{props.file.path}</td>
      <td>{props.metadata.format.format_name}</td>
    </tr>
  );
}
