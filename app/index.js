import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ffbinaries from 'ffbinaries';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();


var platform = ffbinaries.detectPlatform();

ffbinaries.downloadFiles(['ffmpeg', 'ffprobe'], function () {
  console.log('Downloaded ffplay binary for ' + platform + '.');
});


render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
