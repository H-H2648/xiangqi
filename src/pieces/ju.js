import Piece from './piece.js';

//literal equivalent of rook in chess


export default class Ju extends Piece {
    constructor(player, posx, posy, type="Ju"){
      super(player, (player.playerId === 1? "https://upload.wikimedia.org/wikipedia/commons/2/2e/Xiangqi_rl1.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f7/Xiangqi_rd1.svg"), posx, posy, type);
    }

    //checks 4 directions
    isMovePossible(board){
      var listPossible = []
      var x = this.posx - 1
      while(x >= 0 && board[x][this.posy].type == "Empty"){
        this.getPath(listPossible, board, x, this.posy)
        x= x-1
      }
      if (x !== -1){
        this.getPath(listPossible, board, x, this.posy)
      }
      x = this.posx + 1
      while(x <= 9 && board[x][this.posy].type == "Empty"){
        this.getPath(listPossible, board, x, this.posy)
        x = x+1
      }
      if (x !== 10){
        this.getPath(listPossible, board, x, this.posy)
      }
      var y = this.posy - 1
      while(y >= 0 && board[this.posx][y].type === "Empty"){
        this.getPath(listPossible, board, this.posx, y) 
        y = y-1
      }
      if (y !== -1){
        this.getPath(listPossible, board, this.posx, y)
      }
      y = this.posy + 1
      while(y <= 8 && board[this.posx][y].type === "Empty"){
        this.getPath(listPossible, board, this.posx, y)
        y = y+1
      }
      if (y !== 9){
        this.getPath(listPossible, board, this.posx, y)
      }
      return listPossible
    }

  
  }