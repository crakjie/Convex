// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ReactSelectize, SimpleSelect, MultiSelect} from 'react-selectize';
/* <div  className={styles.container}  data-tid="container">*/
/* </div>*/

function defundef(value) {
  return (value === undefined) ? '' : value;
}

export default function LibOpenH264(props) {
  const sliceModes = [
    { label: 'Auto', value: 'auto' },
    { label: 'Fixed', value: 'fixed' },
    { label: 'rowmb', value: 'rowmb' },
    { label: 'Dynamic', value: 'dyn' }
  ];
  const selectedSliceMode = defundef(sliceModes.find(mode => mode.value === props.value.options.get('slice_mode')));

  return (
    <ul>
      <li>resolution
        <input
          onChange={event => props.onChange('size', event.target.value)}
          value={props.value.size}
        />
      </li>
      <li> Set the number of slices, used in parallelized encoding.
        <input
          onChange={event => props.onOptionChange('slices', event.target.value)}
          value={defundef(props.value.options.get('slices'))}
        />
      </li>
      <li> Set slice mode
      <SimpleSelect
          onValueChange={pair => props.onOptionChange('slice_mode', pair.value)}
          placeholder="Set slice mode"
          value={selectedSliceMode}
          options={sliceModes}
        />
      </li>
      <li>video bit rate
          <input
              onChange={event =>props.onChange('vbtr', event.target.value)}
              value={props.value.vbtr}
            /> constant
            <select onChange={event => this.onChange('isConstant', event.target.value)}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
        </li>
        <li> Set the max bitrate (as a number of bits per second).
        <input
          onChange={event => props.onOptionChange('maxrate', event.target.value)}
          value={defundef(props.value.options.get('maxrate'))}
        />
      </li>
      <li> Enable loop filter
        <select onChange={event => this.onOptionChange('loopfilter', event.target.value)}>
          <option value="1 ">Enabled</option>
          <option value="0">Disable</option>
        </select>
      </li>
    </ul>
  );
}
