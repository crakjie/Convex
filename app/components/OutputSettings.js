// @flow
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {ReactSelectize, SimpleSelect, MultiSelect} from 'react-selectize';
import Prores from './codecs/Prores.js';
import LibOpenH264 from './codecs/LibOpenH264.js';
import styles from './OutputSettings.scss';

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

  //TODO show the drop down only if there is a video stream in the file.
  function randerVideoCodecDropdown() {
    if (props.formats[settings.format] !== undefined) {
      return (
        <li>
          <SimpleSelect
            placeholder="Select the video codec"
            options={props.formats[settings.format].video.map(codec => toSelectizeValue(codec))}
            theme="material"
            onValueChange={event => handleValueChange('vcodec', event)}
            value={toSelectizeValue(settings.vcodec)}
          />
        </li>
      );
    }
  }


  function randerAudioCodecDropdown() {
    if (props.formats[settings.format] !== undefined) {
      return (
        <li>
          <SimpleSelect
            placeholder="Select the audio codec"
            options={props.formats[settings.format].audio.map(codec => toSelectizeValue(codec))}
            theme="material"
            onValueChange={event => handleValueChange('acodec', event)}
            value={toSelectizeValue(settings.acodec)}
          />
        </li>
      );
    }
  }

  return (
    <div className={styles.container} >
      <ul>
        <li>
          <label  htmlFor="format">format</label>
          <SimpleSelect
            id="format"
            placeholder="Select a output format"
            options={Object.keys(props.formats).map(format => toSelectizeValue(format))}
            theme="material"
            onValueChange={event => handleValueChange('format', event)}
            value={toSelectizeValue(settings.format)}
          />
        </li>
        {randerVideoCodecDropdown()}
        {renderVideoCodec()}
        {randerAudioCodecDropdown()}
        <li>
          <label htmlFor="fps">frame per second</label>
          <input
            id="fps"
            onChange={event => handleChange('fps', event.target.value)}
            value={settings.fps}
          />
        </li>
        <li>
          <label htmlFor="aquality">audio quality</label>
          <input
            id="aquality"
            onChange={event => handleChange('aquality', event.target.value)}
            value={settings.aquality}
          />
        </li>
        <li>
          <label htmlFor="abtr">audio bit rate</label>
          <input
            id="abtr"
            onChange={event => handleChange('abtr', event.target.value)}
            value={settings.abtr}
          />
        </li>
      </ul>
      <button onClick={() => props.onClick(settings)}>Convert</button>
    </div>
  );
}
