// imports lodash so I can use deepcopy (copies an array without direct reference)
// just importing deepcopy doesn't make the function work for some reason so I just inefficiently imported the whole thing
import _ from "lodash" 
//general properties of a piece. It has a player, appearances, posx, posy
export default class Piece {
    constructor(player, iconUrl, posx, posy){
      this.player = player;
      this.style = {backgroundImage: "url('"+iconUrl+"')"};
      this.posx = posx
      this.posy = posy
    }

    getPath(list, board, positionx, positiony){
      //more detailed way; but for now use the simple way
      /*if (board[positionx][positiony] === undefined){
        list.push([positionx, positiony, "path"])
      }
      else if (board[positionx][positiony].player !== this.player){
        list.push([positionx, positiony, "kill"])
      }
      */
     
    // if the place is open, then it can obviously go there (assuming that this place is accessible by the piece)
    // 
      if (board[positionx][positiony] === undefined || board[positionx][positiony].player !== this.player){
        list.push([positionx, positiony])
      }
  }

    //checks if going to the point, [positionx, positiony], is suicidal
    isSuicide(board, positionx, positiony, opponentPlayer){
      const theoreticalPoints = _.cloneDeep(board)
      theoreticalPoints[positionx][positiony] = theoreticalPoints[this.posx][this.posy]
      theoreticalPoints[positionx][positiony].posx = positionx
      theoreticalPoints[positionx][positiony].posy = positiony
      delete theoreticalPoints[this.posx][this.posy]
      //checks for suicide
      if (this.state.player.isInDanger(theoreticalPoints, opponentPlayer
        )){
        return true;
      }
      return false;
    }

    fullSafeList(board, opponentPlayer){
      isMovePossible = this.isMovePossible(board)
      fullSafeList = _.remove(isMovePossible, function(n){isSuicide(board, n[0], n[1], opponentPlayer)})
      return fullSafeList
    }
}