import React from 'react';

import './App.css';
import Point from './point.js';
import Square from './square.js';

export default class Board extends React.Component {

  
  renderSquare(ii, jj){
    return <Square
      piece = {this.props.points[ii][jj]}
      style = {this.props.points[ii][jj]? this.props.points[ii][jj].style : null}
      onClick={() => this.props.onClick(ii, jj)} 
    />
  }
  
  renderPoint(ii, jj) {
    return <Point
      piece = { this.props.points[ii][jj] } 
      style = {this.props.points[ii][jj]? this.props.points[ii][jj].style : null}
      onClick={() => this.props.onClick(ii, jj)} 
    />
  }



  render() {
    var board = []
    for(let ii = 0; ii < 10; ++ii){
      var boardRows = [];
      for(let jj = 0; jj < 9; ++jj){
        /*
        boardRows.push(this.renderPoint(ii, jj));
        */
       boardRows.push(this.renderPoint(ii, jj));
       //boardRows.push(this.renderPoint(ii, jj));
      }
      board.push(<div className="board-row">{boardRows}</div>)
    }
    
    

    return (
      <div>
        {board}
      </div>
    );
  }
}
