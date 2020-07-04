import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from '../Game/Game.js'


class Enter extends Component {
    state = {}
  
    render() {
      return (
        <div className="App">
            <Router>
                <Switch>
                  <Route component={Game} path="/game/:id" />
                </Switch>
            </Router>
        </div>
      );
    }
  }

export default Enter
