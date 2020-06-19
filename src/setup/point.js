import React from 'react';
import '../App.css';

//each point on the board is a point inside a square (the square refers to the regular cross)
// if a piece exists on that point, we actually put the image of the piece on it.
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

