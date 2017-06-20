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
    <table>
      <tr>
        <td>
          <label htmlFor="size">resolution</label>
          <input
            id="size"
            onChange={event => props.onChange('size', event.target.value)}
            value={props.value.size}
          />
        </td>
        <td>
          <label htmlFor="slices">Set the number of slices, used in parallelized encoding.</label>
          <input
            id="slices"
            onChange={event => props.onOptionChange('slices', event.target.value)}
            value={defundef(props.value.options.get('slices'))}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="slice_mode">Set slice mode.</label>
          <SimpleSelect
            id="slice_mode"
            onValueChange={pair => props.onOptionChange('slice_mode', pair.value)}
            placeholder="Set slice mode"
            value={selectedSliceMode}
            options={sliceModes}
          />
        </td>
        <td>
          <label htmlFor="vbtr">video bit rate.</label>
          <input
            id="vbtr"
            onChange={event =>props.onChange('vbtr', event.target.value)}
            value={props.value.vbtr}
          /> constant
          <label htmlFor="isConstant">constant.</label>
          <select
            id="isConstant"
            onChange={event => this.onChange('isConstant', event.target.value)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="maxrate">Set the max bitrate (as a number of bits per second).</label>
          <input
            id="maxrate"
            onChange={event => props.onOptionChange('maxrate', event.target.value)}
            value={defundef(props.value.options.get('maxrate'))}
          />
        </td>
        <td>
          <label htmlFor="loopfilter">Enable loop filter.</label>
          <select
            id="loopfilter"
            onChange={event => this.onOptionChange('loopfilter', event.target.value)}
          >
            <option value="1 ">Enabled</option>
            <option value="0">Disable</option>
          </select>
        </td>
      </tr>
    </table>
  );
}
