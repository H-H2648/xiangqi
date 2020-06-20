// for cloning the board for checking theoretical checkmate
import _ from "lodash" 


export default function cloneBoard(board){
    const boardClone = []
    for (var ii = 0; ii < 10; ++ii){
        var boardrow = []
        for (var jj = 0; jj < 9; ++jj){
            boardrow.push(_.cloneDeep(board[ii][jj]))
        }
        boardClone.push(boardrow)
    }
    return boardClone
}


