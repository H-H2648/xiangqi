import Piece from './piece.js';
export default class Ma extends Piece {
    constructor(player, posx, posy){
      super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/0/04/Xiangqi_hl1.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/9d/Xiangqi_hd1.svg"), posx, posy);
    }
  
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
          if (this.posy < 9){
            this.getPath(listPossible, board, this.posx+1, this.posy - 2)
          }
        }
      }
      if (this.posy < 7){
        if (board[this.posx][this.posy + 1] === undefined){
          if (this.posx > 0){
            this.getPath(listPossible, board, this.posx-1, this.posy + 2)
          }
          if (this.posy < 9){
            this.getPath(listPossible, board, this.posx+1, this.posy + 2)
          }
        }
      }
      return listPossible
    }
  }