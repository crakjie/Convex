// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          {this.props.children}
        </MuiThemeProvider>
      </div>
    );
  }
}
