import Piece from './piece.js';
export default class Bing extends Piece {
    constructor(player, posx, posy){
      super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/0/0f/Xiangqi_sl1.svg" : "https://upload.wikimedia.org/wikipedia/commons/0/03/Xiangqi_sd1.svg"), posx, posy);
    }

    
  
    isMovePossible(board){
      var listPossible = []
      if(this.player === 1){
        if(this.posx < 9){
          this.getPath(listPossible, board, this.posx + 1, this.posy) 
        } 
        if(this.posx > 4){
          if (this.posy < 8){
            this.getPath(listPossible, board, this.posx , this.posy + 1)
          }
          if (this.posy > 0){
            this.getPath(listPossible, board, this.posx, this.posy - 1)
          }
        }
      }
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
  
    /**
     * always returns empty array because of one step
     * @return {[]}
     */
  }