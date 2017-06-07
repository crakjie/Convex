// @flow
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {ReactSelectize, SimpleSelect, MultiSelect} from 'react-selectize';
import Prores from './codecs/Prores.js'
import LibOpenH264 from './codecs/LibOpenH264.js'
//import styles from './FileLine.scss';
/* <div  className={styles.container}  data-tid="container">*/
/* </div>*/
export default function OutputSetting(props) {

  const settings = Object.assign({}, props.settings);

  function handleChange(key, value) {
    settings[key] = value;
    props.onChange(settings);
  }

  function handleOptionChange(key, value) {
    settings.options.set(key, value);
    props.onChange(settings);
  }

  function handleValueChange(key, event) {
    settings[key] = event.value;
    props.onChange(settings);
  }

  function toSelectizeValue(value) {
    return { label: value, value };
  }

  function renderVideoCodec() {
    switch(settings.vcodec) {
      case 'prores_ks':
        return (
          <Prores
            onOptionChange={(key, event) => handleOptionChange(key, event)}
            onChange={(key, value) => handleChange(key, value)}
            value={settings}
          />
        );
      case 'libopenh264':
        return (
          <LibOpenH264
            onOptionChange={(key, event) => handleOptionChange(key, event)}
            onChange={(key, value) => handleChange(key, value)}
            value={settings}
          />
        );
      default:
        return
    }
  }

  return (
    <div>
      <ul>
        <li>
          <label>format</label>
          <SimpleSelect
            placeholder="Select a output format"
            options={props.formats.map(format => toSelectizeValue(format.name))}
            theme="material"
            onValueChange={event => handleValueChange('format', event)}
            value={toSelectizeValue(settings.format)}
          />
        </li>
        <li>
          video codec
          <SimpleSelect
            placeholder="Select the video codec"
            options={props.videoCodecs.map(codec => toSelectizeValue(codec.name))}
            theme="material"
            onValueChange={event => handleValueChange('vcodec', event)}
            value={toSelectizeValue(settings.vcodec)}
          />
        </li>
        <li>audio codec
          <SimpleSelect
            placeholder="Select the audio codec"
            options={props.audioCodecs.map(codec => toSelectizeValue(codec.name))}
            theme="material"
            onValueChange={event => handleValueChange('acodec', event)}
            value={toSelectizeValue(settings.acodec)}
          />
        </li>
        {renderVideoCodec()}
        <li>frame per second
          <input
            onChange={event => handleChange('fps', event.target.value)}
            value={settings.fps}
          />
        </li>
        <li>audio quality
          <input
            onChange={event => handleChange('aquality', event.target.value)}
            value={settings.aquality}
          />
        </li>
        <li>audio bit rate
          <input
            onChange={event => handleChange('abtr', event.target.value)}
            value={settings.abtr}
          />
        </li>
      </ul>
      <button onClick={() => props.onClick(settings)}>Convert</button>
    </div>
  );
}
