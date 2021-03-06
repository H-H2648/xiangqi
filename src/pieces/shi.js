import BoxedPiece from './boxedPiece.js';
import arrayIncludes from '../helper/arrayEquals.js'
//a boxed piece
// can't get out of the box
// can only go diagonally

export default class Shi extends BoxedPiece {
  constructor(player, posx, posy, type="Shi"){
    super(player, (player.playerId === 1? "https://upload.wikimedia.org/wikipedia/commons/e/ed/Xiangqi_al1.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f5/Xiangqi_ad1.svg"), posx, posy, type);
  }
  
  isMovePossible(board){
    var listPossible = []
    var possible = [[this.posx + 1, this.posy + 1], [this.posx + 1, this.posy - 1], [this.posx - 1, this.posy + 1], [this.posx - 1, this.posy - 1]]
    for (var ii = 0; ii < possible.length; ++ii){
      if (arrayIncludes(possible[ii], this.box())){
        this.getPath(listPossible, board, possible[ii][0], possible[ii][1])
      }
    }
    return listPossible
  }
  
}