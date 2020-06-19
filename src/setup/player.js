import arrayIncludes from '../helper/arrayEquals.js'
export default class Player{
    constructor(playerId, kingPosx, kingPosy){
        this.playerId = playerId;
        this.kingPosx = kingPosx;
        this.kingPosy = kingPosy;
    }

    isInDanger(board){
        for(var ii = 0; ii < 10; ++ii){
            for (var jj = 0; jj < 9; ++jj){
                if (board[ii][jj] && board[ii][jj].player.playerId != this.playerId){
                    if (arrayIncludes([this.kingPosx, this.kingPosy], board[ii][jj].isMovePossible(board))){
                        return true
                    }
                }
            }
        }
        return false
    }
}