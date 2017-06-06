// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/* <div  className={styles.container}  data-tid="container">*/
/* </div>*/

function defundef(value) {
  return (value === undefined) ? '' : value;
}

export default function Prores(props) {
  return (
    <ul>
      <li>resolution
        <input
          onChange={event => props.onChange('size', event)}
          value={props.value.size}
        />
      </li>
      <li>profile
        <option name="profile" >
          <select value="proxy" label="proxy" />
          <select value="lt" label="lt" />
          <select value="standard" label="standard" />
          <select value="hq" label="hq" />
          <select value="4444" label="4444" />
        </option>
      </li>
      <li> quantization matrix
        <option name="quant_mat" >
          <select value="auto" label="auto" />
          <select value="default" label="default" />
          <select value="proxy" label="proxy" />
          <select value="lt" label="lt" />
          <select value="standard" label="standard" />
          <select value="hq" label="hq" />
        </option>
      </li>
      <li> bits per macroblock, max 8000
        <input
          onChange={event => props.onOptionChange('bits_per_mb', event)}
          value={defundef(props.value.options.get('bits_per_mb'))}
        />
      </li>
      <li> Number of macroblocks in each slice (1-8)
        <input
          onChange={event => props.onOptionChange('mbs_per_slice ', event)}
          value={defundef(props.value.options.get('mbs_per_slice '))}
        />
      </li>
      <li> Specify number of bits for alpha component
        <option name="alpha_bits" >
          <select value="0" label="0" />
          <select value="8" label="8" />
          <select value="16" label="16" />
        </option>
      </li>
    </ul>
  );
}
