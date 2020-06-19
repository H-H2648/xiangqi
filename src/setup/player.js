import arrayIncludes from '../helper/arrayEquals.js'
export default class Player{
    constructor(playerId, kingPosx, kingPosy){
        this.playerId = playerId;
        this.kingPosx = kingPosx;
        this.kingPosy = kingPosy;
    }

    isInDanger(board, opponentPlayer){
        for(var ii = 0; ii < 10; ++ii){
            for (var jj = 0; jj < 9; ++jj){
                if (board[ii][jj] && board[ii][jj].player.playerId != this.playerId){
                    //finds if anything can kill the jiang
                    if (arrayIncludes([this.kingPosx, this.kingPosy], board[ii][jj].isMovePossible(board))){
                        return true
                    }
                    //finds whether jiang and jiang will be on the same vertical line with nothing in between
                    if (this.kingPosy === opponentPlayer.kingPosy){
                        for (var ii = 0; ii < opponentPlayer.kingPosx; ++ii){
                            if(board[ii][this.kigPosy]){
                                return false
                            }
                        }
                        return true
                    }
                }
            }
        }
        return false
    }
}