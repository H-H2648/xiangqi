import Piece from './piece.js';
//can only move diagonally (by 2 steps)
// can't cross the river

export default class Xiang extends Piece {
    constructor(player, posx, posy){
      super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/7/77/Xiangqi_el1.svg" : "https://upload.wikimedia.org/wikipedia/commons/1/1a/Xiangqi_ed1.svg"), posx, posy);
    }

    //all the points xiang can theoretically go to
    allowedPlace(){
      if (this.player === 1){
        return [[0, 2], [0, 6], [2, 0], [2, 4], [2, 8], [4, 2], [4, 6]]
      } 
      else{
        return [[9, 2], [9, 6], [7, 0], [7, 4], [7, 8], [5, 2], [5, 6]]
      }
  }
    //outputs all places xiang can go to
    isMovePossible(board){
      var listPossible = []
      if (0 <= this.posx && this.posx <= 7 && 0 <=this.posy && this.posy <= 6 && board[this.posx + 1][this.posy + 1] === undefined){
        if (this.arrayIncludes([this.posx + 2, this.posy + 2], this.allowedPlace())){
          this.getPath(listPossible, board, this.posx + 2, this.posy + 2)
        }
      }
      if (0 <= this.posx && this.posx <= 7 && 2 <=this.posy && this.posy <= 8 && board[this.posx + 1][this.posy - 1] === undefined){
        if(this.arrayIncludes([this.posx + 2, this.posy - 2], this.allowedPlace())){
          this.getPath(listPossible, board, this.posx + 2, this.posy -2)
        }
      }
      if (2 <= this.posx && this.posx <= 9 && 0 <=this.posy && this.posy <= 6 && board[this.posx - 1][this.posy + 1] === undefined){
        if (this.arrayIncludes([this.posx - 2, this.posy + 2], this.allowedPlace())){
          this.getPath(listPossible, board, this.posx - 2, this.posy + 2)
        }
      }
      if (2 <= this.posx && this.posx <= 9 && 2 <=this.posy && this.posy <= 8 && board[this.posx - 1][this.posy - 1] === undefined){
        if(this.arrayIncludes([this.posx - 2, this.posy - 2], this.allowedPlace())){
          this.getPath(listPossible, board, this.posx - 2, this.posy -2)
        }
      }
      return listPossible
    }
  

}