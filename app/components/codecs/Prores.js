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

export default function Prores(props) {
  const profiles = [
    { label: 'Proxy', value: 'proxy' },
    { label: 'lt', value: 'lt' },
    { label: 'Standard', value: 'standard' },
    { label: 'hq', value: 'hq' },
    { label: '4444', value: '4444' }
  ];
  const selectedProfile = defundef(profiles.find(profile => profile.value === props.value.options.get('profile:v')));

  const quantMatrixs = [
    { label: 'Auto', value: 'auto' },
    { label: 'Default', value: 'default' },
    { label: 'Proxy', value: 'proxy' },
    { label: 'lt', value: 'lt' },
    { label: 'hq', value: 'hq' },
    { label: 'Standard', value: 'standard' }
  ];

  const selectedQuantMatrix = defundef(quantMatrixs.find(matrix => matrix.value === props.value.options.get('quant_mat')));

  const alphaBits = [
    { label: '0', value: '0' },
    { label: '8', value: '8' },
    { label: '16', value: '16' }
  ];
  const selectedAlphaBit = defundef(alphaBits.find(alphaBit => alphaBit.value === props.value.options.get('alpha_bits')));

  return (
    <ul>
      <li>
        <SimpleInput
          label="Resolution."
          id="size"
          value={defundef(props.value.options.get('size'))}
          onChange={props.onOptionChange}
        />
      </li>
      <li>
        <SimpleSelect
          id="profile:v"
          onValueChange={pair => props.onOptionChange('profile:v', pair.value)}
          placeholder="Select a profile"
          value={selectedProfile}
          options={profiles}
          theme="material"
        />
      </li>
      <li>
        <SimpleSelect
          id="quant_mat"
          onValueChange={pair => props.onOptionChange('quant_mat', pair.value)}
          placeholder="Select a quantization matrix"
          value={selectedQuantMatrix}
          options={quantMatrixs}
          theme="material"
        />
      </li>
      <li>
        <SimpleInput
          label="Bits per macroblock, max 8000."
          id="bits_per_mb"
          value={defundef(props.value.options.get('bits_per_mb'))}
          onChange={props.onOptionChange}
        />
      </li>
      <li>
        <SimpleInput
          label="Number of macroblocks in each slice (1-8)"
          id="mbs_per_slice"
          value={defundef(props.value.options.get('mbs_per_slice'))}
          onChange={props.onOptionChange}
        />
      </li>
      <li>
        <label htmlFor="alpha_bits">Specify number of bits for alpha component</label>
        <SimpleSelect
          id="alpha_bits"
          onValueChange={pair => props.onOptionChange('alpha_bits', pair.value)}
          placeholder="Specify number of bits for alpha component"
          value={selectedAlphaBit}
          options={alphaBits}
          theme="material"
        />
      </li>
    </ul>
  );
}
