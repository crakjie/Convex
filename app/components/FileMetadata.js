// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './FileMetadata.css';

export default function FileMetadata(props) {

    if(props.fileInfo == null) {
      return <div className={styles.container} ><p>select a file to see metadata</p></div>
    }
    else {
      const video = props.fileInfo.metadata.streams[0];
      return (
        <div className={styles.container} >
          <table>
            <tbody>
              <tr>
                <td>format name</td><td>{props.fileInfo.metadata.format.format_name}</td>
              </tr>
              <tr>
                <td>bit rate</td><td>{props.fileInfo.metadata.format.bi_rate}</td>
              </tr>
              <tr>
                <td>duration</td><td>{props.fileInfo.metadata.format.duration}s</td>
              </tr>
              <tr>
                <td>size</td><td>{props.fileInfo.metadata.format.size}o</td>
              </tr>
              <tr>
                <td>average frame rate</td><td>{video.avg_frame_rate}</td>
              </tr>
              <tr>
                <td>Codec</td><td>{video.codec_long_name}</td>
              </tr>
              <tr>
                <td>Codec tag</td><td>{video.codec_tag_string}</td>
              </tr>
              <tr>
                <td>video bit rate</td><td>{video.bit_rate}</td>
              </tr>
              <tr>
                <td>dimension / codec dimensions</td><td>{video.width}x{video.height} / {video.coded_width}x{video.coded_height}</td>
              </tr>
              <tr>
                <td>number of frames</td><td>{video.nb_frames}</td>
              </tr>
            </tbody>
          </table>
        </div>);
    }


}

