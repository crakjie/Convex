// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ReactSelectize, SimpleSelect, MultiSelect} from 'react-selectize';

function defundef(value) {
  return (value === undefined) ? '' : value;
}

export default function Libkvazaar(props) {

  return (
    <ul>
      <li>
        <label htmlFor="size">resolution</label>
        <input
          id="size"
          onChange={event => props.onChange('size', event.target.value)}
          value={props.value.size}
        />
      </li>
      <li>
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
      </li>
    </ul>
  );
}
