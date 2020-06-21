// for cloning the board for checking theoretical checkmate
import _ from "lodash" 


export default function cloneBoard(board){
    const boardClone = new Array(10)
    for (var ii = 0; ii < 10; ++ii){
        var boardrow = new Array(9)
        for (var jj = 0; jj < 9; ++jj){
            const clone = _.cloneDeep(board[ii][jj])
            boardrow[jj] = clone
        }
        boardClone[ii] = boardrow
    }
    return boardClone
}


