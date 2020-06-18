import Piece from './piece.js';

//types of pieces such that it cannot go outside the box (jiang, shi)
export default class BoxedPiece extends Piece {

    //returns the box that the pieces physically cannot leave
    box(){
        if (this.player === 1){
        return [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]]
        } 
        else{
        return [[9, 3], [9, 4], [9, 5], [8, 3], [8, 4], [8, 5], [7, 3], [7, 4], [7, 5]]
        }
    }
}