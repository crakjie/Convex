// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './FileLine.scss';

function thumbnail(thumbnail) {
  if (thumbnail !== undefined) {
    return (
      <img className={styles.thumbnail} src={thumbnail.split('\\').join('/')} />
    );
  }
}

export default function FileLine(props) {
  // remove windows backslash
  return (
    <div
      onClick={props.onClick}
      className={props.isSelected ? styles.selected : styles.notselected}
    >
      <p>{props.file.name}</p>
      <p>{props.metadata.format.format_name}</p>
      {thumbnail(props.thumbnail)}
    </div>
  );
}
