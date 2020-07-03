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
      board: initializeBoard(player1, player2),
      // the first player is player 1
      currentPlayer: player1,
      // refers to the piece to be moved; undefined because no point has been selected yet
      pieceToBeMovedPosition: undefined,
      // message to the user ()
      messasge: '',
      // it's the "red"'s turn lol
      turn: 'red'
    }
  }

  
  //function when point [i, j] is selected
  handleClick(point){
    positionX, positionY = point[0], point[1]
    const currentPlayer = this.state.currentPlayer
    const board = this.state.board.slice();
    //if nothing was selected before:
    if (this.state.pieceToBeMovedPosition === undefined){
      // the user must choose their own piece first
      if(board[positionX][positionY].player !== currentPlayer){
        this.setState({message: "Wrong selection. Choose player " + currentPlayer + " pieces."});
      }
      else{
        //makes the selected piece slightly green
        board[positionX][positionY].style = {...board[positionX][positionY].style, backgroundColor: "RGB(111,143,114)"};
        //validPointsList is the list of all safe locations that the given piece can go 
        const validPointsList = board[positionX][positionY].fullSafeList(board, this.playerSwitch(currentPlayer))
        for(let ii = 0; ii < validPointsList.length; ++ii){
          // x and y are the coordinates of the safe location to go
          let validX = validPointsList[ii][0]
          let validY = validPointsList[ii][1]
          // shows the available spot as green (slightly transparent)
          board[validX][validY].style = {...board[validX][validY].style,   backgroundColor: "rgba(0, 128, 0, 0.459)"}
        }
                // the message becomes: choose destination
        // the source slection is now [i, j]
        this.setState({
          message: "Choose destination for the selected piece",
          pieceToBeMovedPosition: [positionX, positionY]
        });
      }
    }
    // if the piece to move was already chosen:
    else if(this.state.pieceToBeMovedPosition !== undefined){
      const pieceToBeMovedPosX = this.state.pieceToBeMovedPosition[0]
      const pieceToBeMovedPosY = this.state.pieceToBeMovedPosition[1]
      // if the player tries to kill their own pieces
      if(board[positionX][positionY].player === currentPlayer){
        this.resetBoard(board)
        this.setState({
          message: "Wrong selection. Choose valid source and destination again.",
          pieceToBeMovedPosition: undefined
        });
      }
      else{
        // if player chooses places that are not their own pieces and is actually accessible by the piece chosen:
        //if the jiang is to move, we need to make a clone player so we can actually theoretically move the king (since the position of the king is stored inside the player)
        // we rename sourceSelection[0], sourceSelection[1] so that its more pleasing to look at:
        // pieceToBeMovedPosX = sourceSelection[0], pieceToBeMovedPosY = sourceSelction[1]
        if (board[pieceToBeMovedPosX][pieceToBeMovedPosY].type == "Jiang"){
          //temporarily assumes the king is moved.
          currentPlayer.kingPosx = positionX
          currentPlayer.kingPosy = positionY
          if (arrayIncludes(point, board[pieceToBeMovedPosX][pieceToBeMovedPosY].fullSafeList(board, this.playerSwitch(currentPlayer)))){
            board[positionX][positionY] = board[pieceToBeMovedPosX][pieceToBeMovedPosY]
            board[positionX][positionY].posx = positionX
            board[positionX][positionY].posy= positionY
            board[pieceToBeMovedPosX][pieceToBeMovedPosY] = new Empty(pieceToBeMovedPosX, pieceToBeMovedPosY)
            //if the opponent's jiang is in danger after your move, your opponent will obtain this information
            if(this.playerSwitch(currentPlayer).isInDanger(board, currentPlayer)){
              //if your opponent is dead... CONGRATULATION YOU WON
              this.resetBoard(board)
              if(this.playerSwitch(currentPlayer).isDead(board, currentPlayer)){
                this.setState({
                  message: "YOU LOST THE GAME GOODBYE",
                  pieceToBeMovedPosition: undefined,
                  currentPlayer: this.playerSwitch(currentPlayer),
                  turn: this.colourSwitch(this.state.turn),
                  board: board
                })
              }
              else{
                this.resetBoard(board)
                this.setState({
                  message: "YOUR JIANG IS IN DANGER. PLEASE DO SOMETHING",
                  pieceToBeMovedPosition: undefined,
                  currentPlayer: this.playerSwitch(currentPlayer),
                  turn: this.colourSwitch(this.state.turn),
                  board: board
                })
              }
            }
            else{
              this.resetBoard(board)
              this.setState({
                message: "",
                pieceToBeMovedPosition: undefined,
                currentPlayer: this.playerSwitch(currentPlayer),
                turn: this.colourSwitch(this.state.turn),
                board: board
              })
            }
          }
          else {
            currentPlayer.kingPosx = pieceToBeMovedPosX
            currentPlayer.kingPosy = pieceToBeMovedPosY
            this.resetBoard(board)
            this.setState({
              message: "Wrong selection. Choose valid source and destination again.",
              pieceToBeMovedPosition: undefined
            });
          } 
        }
        else if (arrayIncludes(point, board[pieceToBeMovedPosX][pieceToBeMovedPosY].fullSafeList(board, this.playerSwitch(currentPlayer)))){
          board[positionX][positionY] = board[pieceToBeMovedPosX][pieceToBeMovedPosY]
          board[positionX][positionY].posx = positionX
          board[positionX][positionY].posy = positionY
          board[pieceToBeMovedPosX][pieceToBeMovedPosY] = new Empty(pieceToBeMovedPosX, pieceToBeMovedPosY)
          //changes player
          if(this.playerSwitch(currentPlayer).isInDanger(board, currentPlayer)){
            if(this.playerSwitch(currentPlayer).isDead(board, currentPlayer)){
              this.resetBoard(board)
              this.setState({
                message: "YOU LOST THE GAME GOODBYE",
                pieceToBeMovedPosition: undefined,
                currentPlayer: this.playerSwitch(currentPlayer),
                turn: this.colourSwitch(this.state.turn),
                board: board
              })
            }
            else{
              this.resetBoard(board)
              this.setState({
                message: "YOUR JIANG IS IN DANGER. PLEASE DO SOMETHING",
                pieceToBeMovedPosition: undefined,
                currentPlayer: this.playerSwitch(currentPlayer),
                turn: this.colourSwitch(this.state.turn),
                board: board
              })
            }
          }
          else{
            this.resetBoard(board)
            this.setState({
              message: "",
              pieceToBeMovedPosition: undefined,
              currentPlayer: this.playerSwitch(currentPlayer),
              turn: this.colourSwitch(this.state.turn),
              board: board
            })
          }
        }
        // if player tries to move their piece to an unaccessible place:
        else {
          this.resetBoard(board)
          this.setState({
            message: "Wrong selection. Choose valid source and destination again.",
            pieceToBeMovedPosition: undefined
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
    for(let xx = 0; xx < 10; ++xx){
      for(let yy = 0; yy < 9; ++yy){
        if (board[xx][yy].style){
          board[xx][yy].style = {...board[xx][yy].style, backgroundColor: null}
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
            board = {this.state.board}
            onClick = {(i, j) => this.handleClick([i, j])}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div id="player-turn-box" style={{backgroundColor: this.state.turn}}>
  
            </div>
            <div className="game-message">{this.state.message}</div>
            
          </div>
        </div>
      </div>
    );
  }
}



export default Game;
