import React from 'react';
import './App.css';

export default function Point(props) {
    return (


      <button className = "square">
        <div className="point"
        onClick={props.onClick}
        style={props.style}>
        </div> 
      </button> 
    
    );
}

/*
<button className="point"
        onClick={props.onClick}
        style={props.style}>
      </button> 
*/

/*
<div className = "square">
      
      </div>
*/