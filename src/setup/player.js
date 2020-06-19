import arrayIncludes from '../helper/arrayEquals.js'
export default class Player{
    constructor(playerId, kingPosx, kingPosy){
        this.playerId = playerId;
        this.kingPosx = kingPosx;
        this.kingPosy = kingPosy;
    }

    isInDanger(board, opponentPlayer){
        //console.log(board)
        //console.log('STARTS HERE')
        //console.log(this.playerId)
        for(var ii = 0; ii < 10; ++ii){
            for (var jj = 0; jj < 9; ++jj){
                if(ii === 2 && jj === 4){
                    //console.log(ii)
                    //console.log(jj)
                    //console.log(board[ii][jj])
                    if(board[ii][jj]){
                        //console.log(board[ii][jj].player.playerId)
                    }
                    //console.log(this.playerId)
                }
                //console.log([ii, jj])
                //console.log(board[ii][jj])
                if (board[ii][jj] !== undefined && board[ii][jj].player.playerId != this.playerId){
                    //finds if anything can kill the jiang
                    if(ii === 2 && jj === 4){
                        //console.log(ii)
                        //console.log(ii === 2)
                        //console.log(jj)
                        //console.log(jj === 4)
                        //console.log(board[ii][jj])
                        //console.log(board[ii][jj].isMovePossible(board))
                        //console.log([this.kingPosx, this.kingPosy])
                    }
                    if (arrayIncludes([this.kingPosx, this.kingPosy], board[ii][jj].isMovePossible(board))){
                        //console.log("killing jiang")
                        //console.log([ii, jj])
                        return true
                    }
                    //finds whether jiang and jiang will be on the same vertical line with nothing in between
                    if (this.kingPosy === opponentPlayer.kingPosy){
                        for (ii = 0; ii < opponentPlayer.kingPosx; ++ii){
                            if(board[ii][this.kingPosy] !== undefined){
                                return false
                            }
                        }
                        //console.log("jiangs meet")
                        //console.log([ii, jj])
                        return true
                    }
                }
            }
        }
        return false
    }
}