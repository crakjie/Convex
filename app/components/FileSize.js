// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/* <div  className={styles.container}  data-tid="container">*/
/* </div>*/

function suffix(value : number) {
  if(value / 1024 >= 1 ) {
    if(value / 1024 / 1024 >= 1 ) {
      if(value / 1024 / 1024 / 1024 >= 1 ) {
        if(value / 1024 / 1024 / 1024 / 1024 >= 1 ) {
          return (value/ 1024 / 1024 / 1024 / 1024).toFixed(2) + 'to';
        } else {
          return (value/ 1024 / 1024 / 1024).toFixed(2) + 'go';
        }
      } else {
        return (value/ 1024 / 1024).toFixed(2) + 'mo';
      }
    } else {
      return (value/ 1024).toFixed(2) +'ko';
    }
  } else {
    return '';
  }
}


export default function FileSize(props) {
  return (
    <span>{suffix(props.value)}</span>
  );
}
