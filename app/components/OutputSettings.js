// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ReactSelectize, SimpleSelect, MultiSelect} from 'react-selectize';
import Prores from './codecs/Prores';
import LibOpenH264 from './codecs/LibOpenH264';
import Libkvazaar from './codecs/Libkvazaar';
import Aac from './codecs/Aac';
import styles from './OutputSettings.scss';
//Le style et le fait d'avoir a manager le state 'active/unactive' me soule
import { Tabs, Panel } from 'react-tabtab';

export default class OutputSetting extends Component {

  constructor(props) {
    super();
    this.state = {
      activeTab: 0
    };
    this.settings = Object.assign({}, props.settings);
    this.handleTabClick = this.handleTabClick.bind(this);
  }


  handleChange(key, value) {
    this.settings[key] = value;
    this.props.onChange(this.settings);
  }

  handleOptionChange(key, value) {
    this.settings.options.set(key, value);
    this.props.onChange(this.settings);
  }

  handleValueChange(key, event) {
    this.settings[key] = event.value;
    this.props.onChange(this.settings);
  }

  toSelectizeValue(value) {
    return { label: value, value };
  }

  renderVideoCodec() {
    switch(this.settings.vcodec) {
      case 'prores_ks':
        return (
          <Prores
            onOptionChange={(key, event) => this.handleOptionChange(key, event)}
            onChange={(key, value) => this.handleChange(key, value)}
            value={this.settings}
          />
        );
      case 'libopenh264':
        return (
          <LibOpenH264
            onOptionChange={(key, event) => this.handleOptionChange(key, event)}
            onChange={(key, value) => this.handleChange(key, value)}
            value={this.settings}
          />
        );
      case 'libkvazaar':
        return (
          <Libkvazaar
            onOptionChange={(key, event) => this.handleOptionChange(key, event)}
            onChange={(key, value) => this.handleChange(key, value)}
            value={this.settings}
          />
        );
      default:
        return;
    }
  }

  renderAudioCodec() {
    switch(this.settings.acodec) {
      case 'aac':
        return (
          <Aac
            onOptionChange={(key, event) => this.handleOptionChange(key, event)}
            onChange={(key, value) => this.handleChange(key, value)}
            value={this.settings}
          />
        );
      default:
        return;
    }
  }

  handleTabClick(key) {
    this.setState({activeTab: key});
  }

  //TODO show the drop down only if there is a video stream in the file.
  randerVideoCodecDropdown() {
    if (this.props.formats[this.settings.format] !== undefined) {
      return (
        <li>
          <SimpleSelect
            placeholder="Select the video codec"
            options={this.props.formats[this.settings.format].video.map(codec => this.toSelectizeValue(codec))}
            theme="material"
            onValueChange={event => this.handleValueChange('vcodec', event)}
            value={this.toSelectizeValue(this.settings.vcodec)}
          />
        </li>
      );
    }
  }


  randerAudioCodecDropdown() {
    if (this.props.formats[this.settings.format] !== undefined) {
      return (
        <li>
          <SimpleSelect
            placeholder="Select the audio codec"
            options={this.props.formats[this.settings.format].audio.map(codec => this.toSelectizeValue(codec))}
            theme="material"
            onValueChange={event => this.handleValueChange('acodec', event)}
            value={this.toSelectizeValue(this.settings.acodec)}
          />
        </li>
      );
    }
  }

  render() {
    return (
      <div className={styles.container} >
        <Tabs style="outputSettings__"
              activeKey={this.state.activeTab}
              handleTabClick={this.handleTabClick}
              >
          <Panel title="Format">
            <label  htmlFor="format">format</label>
            <SimpleSelect
              id="format"
              placeholder="Select a output format"
              options={Object.keys(this.props.formats).map(format => this.toSelectizeValue(format))}
              theme="material"
              onValueChange={event => this.handleValueChange('format', event)}
              value={this.toSelectizeValue(this.settings.format)}
            />
          </Panel>
          <Panel title="Video">
            {this.randerVideoCodecDropdown()}
            {this.renderVideoCodec()}
          </Panel>
          <Panel title="Audio">
            {this.randerAudioCodecDropdown()}
            {this.renderAudioCodec()}
          </Panel>
        </Tabs>
        <button onClick={() => this.props.onClick(this.settings)}>Convert</button>
      </div>
    );
  }
}
