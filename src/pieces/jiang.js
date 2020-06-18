import BoxedPiece from './boxedPiece.js';
export default class Jiang extends BoxedPiece {
  constructor(player, posx, posy){
    super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/5/50/Xiangqi_gl1.svg" : "https://upload.wikimedia.org/wikipedia/commons/6/69/Xiangqi_gd1.svg"), posx, posy);
  }

  //still not implemented the case of two jiangs meeting each other
  //not implmented anything about jiang in being danger
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