import BoxedPiece from './boxedPiece.js';

//jiang, the most important piece of the game
//equivalent to king of chess; it cannot leave the box
export default class Jiang extends BoxedPiece {
  constructor(player, posx, posy){
    super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/5/50/Xiangqi_gl1.svg" : "https://upload.wikimedia.org/wikipedia/commons/6/69/Xiangqi_gd1.svg"), posx, posy);
  }


  //two jiangs cannot be on the same line with nothing in between. I haven't implemented that lol (I will cover it later)
  //For now, jiang can move in 4 direction (only one step), it can't go over the box
  
  isMovePossible(board){
    var listPossible = []
    var possible = [[this.posx + 1, this.posy], [this.posx - 1, this.posy], [this.posx, this.posy-1], [this.posx, this.posy + 1]]
    for (var ii = 0; ii < possible.length; ++ii){
      if (this.arrayIncludes(possible[ii], this.box())){
        this.getPath(listPossible, board, possible[ii][0], possible[ii][1])
      }
    }
    return listPossible
  }
}