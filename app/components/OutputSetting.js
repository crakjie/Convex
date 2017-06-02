// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ReactSelectize, SimpleSelect, MultiSelect} from 'react-selectize';
//import styles from './FileLine.scss';
/* <div  className={styles.container}  data-tid="container">*/
/* </div>*/
export default function OutputSetting(props) {
  return (
    <div>
      <ul>
        <li>
          <label>format</label>
          <SimpleSelect
            placeholder="Select a output format"
            options = {props.formats.map(
                format => ({label: format.name, value: format.name})
            )}
            theme = "material"
          />
        </li>
        <li>size <input></input></li>
        <li>frame per second <input></input></li>
        <li>
          video codec
          <SimpleSelect
            placeholder="Select the video codec"
            options = {props.videoCodecs.map(
                codec => ({label: codec.name, value: codec.name})
            )}
            theme = "material"
          />
        </li>
        <li>video bit rate <input></input> constant
          <select>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </li>
        <li>audio codec
          <SimpleSelect
            placeholder="Select the audio codec"
            options = {props.audioCodecs.map(
                codec => ({label: codec.name, value: codec.name})
            )}
            theme = "material"
          />
        </li>
        <li>audio quality <input></input></li>
        <li>audio bit rate <input></input></li>
      </ul>
    </div>
  );
}
