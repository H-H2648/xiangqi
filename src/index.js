import React from 'react';
import ReactDOM from 'react-dom';

import Game from './setup/Game'

const express = require('express');
const http = require('http');
const socket = require('socket.io');

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);

//OG index.js with hot module reloading

if (module.hot) {
  module.hot.accept()
}
