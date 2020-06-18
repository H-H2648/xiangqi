import Piece from './piece.js';


export default class Pao extends Piece {
    constructor(player, posx, posy){
      super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/1/1f/Xiangqi_cl1.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/43/Xiangqi_cd1.svg"), posx, posy);
    }
  
    isMovePossible(board){
      var listPossible = []
      var x = this.posx + 1
      while (x < 10 && board[x][this.posy] === undefined){
        this.getPath(listPossible, board, x, this.posy)
        x = x + 1
      }
      x = x + 1
      while (x < 10 && board[x][this.posy] === undefined){
        this.getPath(listPossible, board, x, this.posy)
        x = x + 1
      }
      if (x < 10){
        this.getPath(listPossible, board, x, this.posy)
      }
      x = this.posx - 1
      while (x >= 0 && board[x][this.posy] === undefined){
        this.getPath(listPossible, board, x, this.posy)
        x = x - 1
      }
      x = x-1
      while (x >= 0 && board[x][this.posy] === undefined){
        this.getPath(listPossible, board, x, this.posy)
        x = x - 1
      }
      if (x >= 0 ){
        this.getPath(listPossible, board, x, this.posy)
      }
      var y = this.posy + 1
      while (y < 9 && board[this.posx][y] === undefined){
        this.getPath(listPossible, board, this.posx, y)
        y = y + 1
      }
      while (y < 9 && board[this.posx][y] === undefined){
        this.getPath(listPossible, board, this.posx, y)
        y = y+1
      }
      if (y < 9){
        this.getPath(listPossible, board, this.posx, y)
      }
      y = this.posy - 1
      while (y >= 0 && board[this.posx][y] === undefined){
        this.getPath(listPossible, board, this.posx, y)
        y = y - 1
      }
      while (y >= 0 && board[this.posx][y] === undefined){
        this.getPath(listPossible, board, this.posx, y)
        y = y-1
      }
      if (y >= 0){
        this.getPath(listPossible, board, this.posx, y)
      }
      return listPossible
    }
  
}