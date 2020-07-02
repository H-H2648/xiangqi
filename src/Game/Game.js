import React, { Component } from 'react';
import  './App.css';
import Board from './board.js' 
import initializeBoard from './initialize.js'
import Player from './player.js';
import arrayIncludes from '../helper/arrayEquals.js';
import Empty from '../pieces/empty.js';



//setting up players
var player1 = new Player(1, 0, 4)
var player2 = new Player(2, 9, 4)

class Game extends Component {
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
    const ii = ij[0]
    const jj = ij[1]
    const player = this.state.player
    const points = this.state.points.slice();
    //if nothing was selected before:
    if (this.state.sourceSelection === undefined){
      // the user must choose their own piece first
      if(points[ii][jj].player !== this.state.player){
        this.setState({status: "Wrong selection. Choose player " + this.state.player + " pieces."});
      }
      else{
        //makes the selected piece slightly green
        points[ii][jj].style = {...points[ii][jj].style, backgroundColor: "RGB(111,143,114)"};
        //fullLIST is the list of all safe locations that the given piece can go 
        const fullLIST = points[ii][jj].fullSafeList(points, this.playerSwitch(player))
        for(let kk = 0; kk < fullLIST.length; ++kk){
          // x and y are the coordinates of the safe location to go
          let x = fullLIST[kk][0]
          let y = fullLIST[kk][1]
          // shows the available spot as green (slightly transparent)
          points[x][y].style = {...points[x][y].style,   backgroundColor: "rgba(0, 128, 0, 0.459)"}
        }
                // the status becomes: choose destination
        // the source slection is now [i, j]
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: [ii, jj]
        });
      }
    }
    // if the piece to move was already chosen:
    else if(this.state.sourceSelection !== undefined){
      const sourceX = this.state.sourceSelection[0]
      const sourceY = this.state.sourceSelection[1]
      // if the player tries to kill their own pieces
      if(points[ii][jj].player === this.state.player){
        this.resetBoard(points)
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: undefined
        });
      }
      else{
        // if player chooses places that are not their own pieces and is actually accessible by the piece chosen:
        //if the jiang is to move, we need to make a clone player so we can actually theoretically move the king (since the position of the king is stored inside the player)
        // we rename sourceSelection[0], sourceSelection[1] so that its more pleasing to look at:
        // sourceX = sourceSelection[0], sourceY = sourceSelction[1]
        if (points[sourceX][sourceY].type == "Jiang"){
          //temporarily assumes the king is moved.
          player.kingPosx = ii
          player.kingPosy = jj
          if (arrayIncludes(ij, points[sourceX][sourceY].fullSafeList(points, this.playerSwitch(player)))){
            points[ii][jj] = points[sourceX][sourceY]
            points[ii][jj].posx = ii
            points[ii][jj].posy= jj
            points[sourceX][sourceY] = new Empty(sourceX, sourceY)
            //if the opponent's jiang is in danger after your move, your opponent will obtain this information
            if(this.playerSwitch(player).isInDanger(points, player)){
              //if your opponent is dead... CONGRATULATION YOU WON
              this.resetBoard(points)
              if(this.playerSwitch(player).isDead(points, player)){
                this.setState({
                  status: "YOU LOST THE GAME GOODBYE",
                  sourceSelection: undefined,
                  player: this.playerSwitch(player),
                  turn: this.colourSwitch(this.state.turn),
                  points: points
                })
              }
              else{
                this.resetBoard(points)
                this.setState({
                  status: "YOUR JIANG IS IN DANGER. PLEASE DO SOMETHING",
                  sourceSelection: undefined,
                  player: this.playerSwitch(player),
                  turn: this.colourSwitch(this.state.turn),
                  points: points
                })
              }
            }
            else{
              this.resetBoard(points)
              this.setState({
                status: "",
                sourceSelection: undefined,
                player: this.playerSwitch(player),
                turn: this.colourSwitch(this.state.turn),
                points: points
              })
            }
          }
          else {
            player.kingPosx = sourceX
            player.kingPosy = sourceY
            this.resetBoard(points)
            this.setState({
              status: "Wrong selection. Choose valid source and destination again.",
              sourceSelection: undefined
            });
          } 
        }
        else if (arrayIncludes(ij, points[sourceX][sourceY].fullSafeList(points, this.playerSwitch(player)))){
          points[ii][jj] = points[sourceX][sourceY]
          points[ii][jj].posx = ii
          points[ii][jj].posy = jj
          points[sourceX][sourceY] = new Empty(sourceX, sourceY)
          //changes player
          if(this.playerSwitch(player).isInDanger(points, player)){
            if(this.playerSwitch(player).isDead(points, player)){
              this.resetBoard(points)
              this.setState({
                status: "YOU LOST THE GAME GOODBYE",
                sourceSelection: undefined,
                player: this.playerSwitch(player),
                turn: this.colourSwitch(this.state.turn),
                points: points
              })
            }
            else{
              this.resetBoard(points)
              this.setState({
                status: "YOUR JIANG IS IN DANGER. PLEASE DO SOMETHING",
                sourceSelection: undefined,
                player: this.playerSwitch(player),
                turn: this.colourSwitch(this.state.turn),
                points: points
              })
            }
          }
          else{
            this.resetBoard(points)
            this.setState({
              status: "",
              sourceSelection: undefined,
              player: this.playerSwitch(player),
              turn: this.colourSwitch(this.state.turn),
              points: points
            })
          }
        }
        // if player tries to move their piece to an unaccessible place:
        else {
          this.resetBoard(points)
          this.setState({
            status: "Wrong selection. Choose valid source and destination again.",
            sourceSelection: undefined
          });
        } 
      }
    }
  }

  //switches player1 -> player2
  // player2 -> player1
  playerSwitch(player){
    if (player == player1){
      return player2
    }
    if (player == player2){
      return player1
    }
  }
  
  //switches red -> black
  //switches black -> red
  colourSwitch(colour){
    if (colour === "red"){
      return "black"
    }
    if (colour === "black"){
      return "red"
    }
  }

  resetBoard(board){
    for(let ii = 0; ii < 10; ++ii){
      for(let jj = 0; jj < 9; ++jj){
        if (board[ii][jj].style){
          board[ii][jj].style = {...board[ii][jj].style, backgroundColor: null}
        }
      }
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



export default Game;
