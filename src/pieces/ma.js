import Piece from './piece.js';
//almost equivalent to knight of chess
//it moves one in one direction, then a diagonal with the component of the direction it moved in being positive. If there is anything in the way between it, then ma cannob move

export default class Ma extends Piece {
    constructor(player, posx, posy){
      super(player, (player.playerId === 1? "https://upload.wikimedia.org/wikipedia/commons/0/04/Xiangqi_hl1.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/9d/Xiangqi_hd1.svg"), posx, posy);
    }
  
    //checks if there is anything that is blocking ma's way
    // if not it can go
    isMovePossible(board){
      var listPossible = []
      if (this.posx > 1){
        if (board[this.posx-1][this.posy] === undefined){
          if (this.posy > 0){
            this.getPath(listPossible, board, this.posx-2, this.posy-1)
          }
          if (this.posy < 8){
            this.getPath(listPossible, board, this.posx-2, this.posy + 1)
          }
        }
      }
      if (this.posx < 8){
        if(board[this.posx+1][this.posy] === undefined){
          if (this.posy > 0){
            this.getPath(listPossible, board, this.posx+2, this.posy-1)
          }
          if (this.posy < 8){
            this.getPath(listPossible, board, this.posx+2, this.posy + 1)
          }
        }
      }
      if (this.posy > 1){
        if (board[this.posx][this.posy - 1] === undefined){
          if (this.posx > 0){
            this.getPath(listPossible, board, this.posx-1, this.posy-2)
          }
          if (this.posx < 9){
            this.getPath(listPossible, board, this.posx+1, this.posy - 2)
          }
        }
      }
      if (this.posy < 7){
        if (board[this.posx][this.posy + 1] === undefined){
          if (this.posx > 0){
            this.getPath(listPossible, board, this.posx-1, this.posy + 2)
          }
          if (this.posx < 9){
            this.getPath(listPossible, board, this.posx+1, this.posy + 2)
          }
        }
      }
      return listPossible
    }
  }