import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import API from '../API/API';

const { baseAPI } = API;

class Home extends Component {
    state = {
        error: undefined,
        gameId: undefined,
        waiting: false,
    }

    componentDidMount(){
        this.socket = io(baseAPI);

        this.socket.on('connection', () => {
            console.log('connected')
        })
    }

    componentWillUnmount() {
        this.socket.removeAllListeners();
        this.socket.close();
    }

    render(){
        return(
        <h1>Hello</h1>
        )
    }
    
    
  }

export default Home