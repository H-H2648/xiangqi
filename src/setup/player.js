import arrayIncludes from '../helper/arrayEquals.js'
export default class Player{
    constructor(playerId, kingPosx, kingPosy){
        this.playerId = playerId;
        this.kingPosx = kingPosx;
        this.kingPosy = kingPosy;
    }

    isInDanger(board, opponentPlayer){
        //finds whether jiang and jiang will be on the same vertical line with nothing in between
        if (this.kingPosy === opponentPlayer.kingPosy){
            if (this.jiangMeet(board, opponentPlayer)){
                return true
            }
        }
        for(var ii = 0; ii < 10; ++ii){
            for (var jj = 0; jj < 9; ++jj){
                if (board[ii][jj].player && board[ii][jj].player.playerId !== this.playerId ){
                    //finds whether jiang is killable
                    if(arrayIncludes([this.kingPosx, this.kingPosy], board[ii][jj].isMovePossible(board))){
                        return true
                    }
                }
            }
        }
        return false
    }

    //checks if the player is officially dead (there is no move to save them)
    isDead(board, opponentPlayer){
        for(var ii = 0; ii < 10; ++ii){
            for (var jj = 0; jj < 9; ++jj){
                if(board[ii][jj] && board[ii][jj].player.playerId === this.playerId){
                    if (board[ii][jj].fullSafeList(board, opponentPlayer).length !== 0){
                        return false
                    }
                }
            }
        }
        return true

    }

    //helper function to tell whether the two jiangs are on the same line with nothing in between
    // assumes two jiangs are on the same line
    jiangMeet(board, opponentPlayer){
        const start = Math.min(this.kingPosx, opponentPlayer.kingPosx)
        const end = Math.max(this.kingPosx, opponentPlayer.kingPosx)
        for(var ii = start + 1; ii < end; ++ii){
            if(board[ii][this.kingPosy].type !== "Empty"){
                return false
            }
        }
        return true
    }
}