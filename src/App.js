import React, { Component } from 'react';
import  './App.css';
import Board from './board.js' 
import initializeBoard from './setup/initialize.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      points: initializeBoard(),
      player: 1,
      sourceSelection: undefined,
      status: '',
      turn: 'red'
    }
  }

  
  handleClick(ij){
    const points = this.state.points.slice();
    if (this.state.sourceSelection === undefined){
      if(!points[ij[0]][ij[1]] || points[ij[0]][ij[1]].player !== this.state.player){
        this.setState({status: "Wrong selection. Choose player " + this.state.player + " pieces."});
      }
      else{
        points[ij[0]][ij[1]].style = {...points[ij[0]][ij[1]].style, backgroundColor: "RGB(111,143,114)"}; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        console.log(points[ij[0]][ij[1]].isMovePossible(this.state.points))
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: [ij[0], ij[1]]
        });
      }
    }
    else if(this.state.sourceSelection !== undefined){
      if(points[ij[0]][ij[1]] && points[ij[0]][ij[1]].player === this.state.player){
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: undefined
        });
      }
      else{
        if (this.arrayIncludes(ij, points[this.state.sourceSelection[0]][this.state.sourceSelection[1]].isMovePossible(points))){
          points[ij[0]][ij[1]] = points[this.state.sourceSelection[0]][this.state.sourceSelection[1]]
          points[ij[0]][ij[1]].posx = ij[0]
          points[ij[0]][ij[1]].posy = ij[1]
          delete points[this.state.sourceSelection[0]][this.state.sourceSelection[1]]
          this.setState({
            statsus: "",
            sourceSelection: undefined,
            player: this.playerSwitch(this.state.player),
            turn: this.colourSwitch(this.state.player),
            points: points
          });
        }
        else{
          this.setState({
            status: "Wrong selection. Choose valid source and destination again.",
            sourceSelection: undefined
          });
        } 
      }
    }
  }
  
  
  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

//finds a in b
  arrayIncludes(a, b){
    for (var ii = 0; ii < b.length; ++ii){
        if (this.arraysEqual(b[ii], a)){
            return true
        }
    }
    return false
  }

  playerSwitch(player){
    if (player === 1){
      return 2
    }
    if (player === 2){
      return 1
    }
  }
  
  colourSwitch(colour){
    if (colour === "red"){
      return "black"
    }
    if (colour === "black"){
      return "red"
    }
  }

  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board 
            points = {this.state.points}
            onClick = {(i, j) => this.handleClick([i, j])}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div id="player-turn-box" style={{backgroundColor: this.state.turn}}>
  
            </div>
            <div className="game-status">{this.state.status}</div>
            
          </div>
        </div>
      </div>
    );
  }
}



export default App;
