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
                console.log("jiang be meeting")
                return true
            }
        }
        for(var ii = 0; ii < 10; ++ii){
            for (var jj = 0; jj < 9; ++jj){
                if (board[ii][jj] && board[ii][jj].player.playerId != this.playerId){
                    //finds whether jiang is killable
                    if (arrayIncludes([this.kingPosx, this.kingPosy], board[ii][jj].isMovePossible(board))){
                        console.log("this is guy is going to kill you")
                        console.log(board)
                        console.log([ii, jj])
                        console.log(board[ii][jj])
                        return true
                    }
                }
            }
        }
        return false
    }

    //helper function to tell whether the two jiangs are on the same line with nothing in between
    // assumes two jiangs are on the same line
    jiangMeet(board, opponentPlayer){
        console.log(this)
        console.log(opponentPlayer)
        const start = Math.min(this.kingPosx, opponentPlayer.kingPosx)
        const end = Math.max(this.kingPosx, opponentPlayer.kingPosx)
        console.log(board)
        console.log(start)
        console.log(end)
        for(var ii = start + 1; ii < end; ++ii){
            if(board[ii][this.kingPosy] !== undefined){
                console.log("good news!")
                console.log("this guy is in the way")
                console.log([ii, this.kingPosy])
                console.log(board[ii][this.kingPosy])
                return false
            }
        }
        return true
    }
}