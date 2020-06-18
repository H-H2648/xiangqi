import React from 'react';
import './App.css';

export default function Point(props) {
    return (
      <button className={"point"}
      onClick={props.onClick}
      style={props.style}>
      </button>
    );
  
}