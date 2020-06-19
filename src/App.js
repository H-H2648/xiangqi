import React, { Component } from 'react';
import  './App.css';
import Board from './setup/board.js' 
import initializeBoard from './setup/initialize.js'
import player from './setup/player.js'
import Player from './setup/player.js';


//main react code
var player1 = new Player(1, 0, 4)
var player2 = new Player(2, 9, 4)

class App extends Component {
  //initializes the players
  constructor(){
    super();
    this.state = {
      // we start with setting up the board
      points: initializeBoard(player1, player2),
      // the first player is player 1
      player: player1,
      // refers to the point selected; undefined because no point has been selected yet
      sourceSelection: undefined,
      status: '',
      // it's the "red"'s turn lol
      turn: 'red'
    }
  }

  
  //function when point [i, j] is selected
  handleClick(ij){
    const points = this.state.points.slice();
    //if nothing was selected before:
    if (this.state.sourceSelection === undefined){
      // the user must choose their own piece first
      if(!points[ij[0]][ij[1]] || points[ij[0]][ij[1]].player !== this.state.player){
        this.setState({status: "Wrong selection. Choose player " + this.state.player + " pieces."});
      }
      else{
        //not sure what this does lol
        points[ij[0]][ij[1]].style = {...points[ij[0]][ij[1]].style, backgroundColor: "RGB(111,143,114)"}; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        // for debuggig purpose
        console.log(points[ij[0]][ij[1]].isMovePossible(this.state.points))
        // the status becomes: choose destination
        // the source slection is now [i, j]
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: [ij[0], ij[1]]
        });
      }
    }
    // if the piece to move was already chosen:
    else if(this.state.sourceSelection !== undefined){
      // if the player tries to kill their own pieces
      if(points[ij[0]][ij[1]] && points[ij[0]][ij[1]].player === this.state.player){
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: undefined
        });
      }
      else{
        // if player chooses places that are not their own pieces and is actually accessible by the piece chosen:
        if (this.arrayIncludes(ij, points[this.state.sourceSelection[0]][this.state.sourceSelection[1]].isMovePossible(points))){
          //moves the piece
          points[ij[0]][ij[1]] = points[this.state.sourceSelection[0]][this.state.sourceSelection[1]]
          points[ij[0]][ij[1]].posx = ij[0]
          points[ij[0]][ij[1]].posy = ij[1]
          // deletes the OG point
          delete points[this.state.sourceSelection[0]][this.state.sourceSelection[1]]
          //changes player
          this.setState({
            statsus: "",
            sourceSelection: undefined,
            player: this.playerSwitch(this.state.player),
            turn: this.colourSwitch(this.state.player),
            points: points
          });
        }
        // if player tries to move their piece to an unaccessible place:
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
    if (player === player1){
      return player2
    }
    if (player === player2){
      return player1
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
