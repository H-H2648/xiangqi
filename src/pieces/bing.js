import Piece from './piece.js';

//bing (it can only move forward (by one) before it "crosses" the river (x = 4, 5). Once it crosses the river it can move sidways)
export default class Bing extends Piece {
    constructor(player, posx, posy){
      super(player, (player.playerId === 1? "https://upload.wikimedia.org/wikipedia/commons/0/0f/Xiangqi_sl1.svg" : "https://upload.wikimedia.org/wikipedia/commons/0/03/Xiangqi_sd1.svg"), posx, posy);
    }

    
    //returns a list of all possible places that it can go
    isMovePossible(board){
      var listPossible = []
      if(this.player === 1){
        // it can always move forward
        if(this.posx < 9){
          this.getPath(listPossible, board, this.posx + 1, this.posy) 
        } 
        //once it crosses the river, it can move sideways
        if(this.posx > 4){
          if (this.posy < 8){
            this.getPath(listPossible, board, this.posx , this.posy + 1)
          }
          if (this.posy > 0){
            this.getPath(listPossible, board, this.posx, this.posy - 1)
          }
        }
      }
      //same logic for player 2 (but river is at x = 5)
      else{
        if (this.posx > 0){
          this.getPath(listPossible, board, this.posx - 1, this.posy)
        }
        if(this.posx < 5){
          if (this.posy < 8){
            this.getPath(listPossible, board, this.posx, this.posy + 1)
          }
          if (this.posx > 0){
            this.getPath(listPossible, board, this.posx, this.posy - 1)
          }
        }
      }
      return listPossible     
    }
  }