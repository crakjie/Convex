// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ReactSelectize, SimpleSelect, MultiSelect} from 'react-selectize';
import SimpleInput from '../SimpleInput';

/* <div  className={styles.container}  data-tid="container">*/
/* </div>*/

function defundef(value) {
  return (value === undefined) ? '' : value;
}

export default function Aac(props) {
  const coders = [
    { label: 'Two loop searching (TLS) method.', value: 'twoloop' },
    { label: 'Average noise to mask ratio (ANMR) trellis-based solution.', value: 'anmr' },
    { label: 'Constant quantizer method.', value: 'fast' },
  ];
  const selectedCoder = defundef(coders.find(coder => coder.value === props.value.options.get('aac_coder')));

  const profiles = [
    { label: 'Main-type prediction profile', value: 'aac_main' },
    { label: 'The default, AAC "Low-complexity" profile.', value: 'aac_low' },
    { label: 'lt', value: 'mpeg2_aac_low' },
    { label: 'Long term prediction profile', value: 'aac_ltp' }
  ];
  const selectedProfile = defundef(profiles.find(profile => profile.value === props.value.options.get('profile:a')));

  return (
    <table>
      <tr>
        <td>
          <SimpleInput
            label="Resolution."
            id="size"
            value={defundef(props.value.options.get('size'))}
            onChange={props.onOptionChange}
          />
        </td>
        <td>
          <SimpleSelect
            id="aac_coder"
            onValueChange={pair => props.onOptionChange('aac_coder', pair.value)}
            placeholder="Select ACC coder"
            value={selectedCoder}
            options={coders}
            theme="material"
          />
        </td>
      </tr>
      <tr>
        <td>
          <SimpleSelect
            id="profile:a"
            onValueChange={pair => props.onOptionChange('profile:a', pair.value)}
            placeholder="Select a profile"
            value={selectedProfile}
            options={profiles}
            theme="material"
          />
        </td>
        <td>
          <SimpleInput
            label="Set cutoff frequency."
            id="cutoff"
            value={defundef(props.value.options.get('cutoff'))}
            onChange={props.onOptionChange}
          />
        </td>
      </tr>
      <tr>
        <td>
          <SimpleInput
            label="Set constant bit rate in bits/s."
            id="a:b"
            value={defundef(props.value.options.get('a:b'))}
            onChange={props.onOptionChange}
          />
        </td>
        <td>
          <SimpleInput
            label="Set quality for variable bit rate (VBR) mode."
            id="a:q"
            value={defundef(props.value.options.get('a:q'))}
            onChange={props.onOptionChange}
          />
        </td>
      </tr>
    </table>
  );
}
