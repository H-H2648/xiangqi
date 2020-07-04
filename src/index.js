import React from 'react';
import ReactDOM from 'react-dom';
import Enter from './Initial/Enter'
import Game from './Game/Game'


ReactDOM.render(
  <React.StrictMode>
    <Enter />
  </React.StrictMode>,
  document.getElementById('root')
);

/*
ReactDOM.render(
  <React.StrictMode>
    <Enter />
  </React.StrictMode>,
  document.getElementById('root')
)
*/

//OG index.js with hot module reloading

if (module.hot) {
  module.hot.accept()
}
