// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

export default function SimpleInput(props) {
  return (
    <div className="input-field">
      <label  htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        onChange={event => props.onChange(props.id, event.target.value)}
        value={props.value}
        type="text"
      />
    </div>
  );
}
