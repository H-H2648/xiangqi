// imports lodash so I can use deepcopy (copies an array without direct reference)
// just importing deepcopy doesn't make the function work for some reason so I just inefficiently imported the whole thing
import _ from "lodash" 


const clone = require('rfdc')()

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
      //for some reason cloneDeep seem to be cloned with some corruption(?)
      //const theoreticalPoints = _.cloneDeep(board)
      //console.log(theoreticalPoints)
      // rfdc dont work either
      // may need to write my own clone function :(
      const theoreticalPoints = clone(board)
      console.log(theoreticalPoints)
      theoreticalPoints[positionx][positiony] = theoreticalPoints[this.posx][this.posy]
      theoreticalPoints[positionx][positiony].posx = positionx
      theoreticalPoints[positionx][positiony].posy = positiony
      delete theoreticalPoints[this.posx][this.posy]
      //console.log(theoreticalPoints)
      //console.log(this.player)
      //checks for suicide
      if (this.player.isInDanger(theoreticalPoints, opponentPlayer)){
        return true;
      }
      return false;
    }

    fullSafeList(board, opponentPlayer){
      const isMovePossible = this.isMovePossible(board)
      console.log(isMovePossible)
      //for some reason "this" doesn't really work inside {} so I will just make another reference
      var reference = this
      var unsafeList = _.remove(isMovePossible, function(n){ 
        reference.isSuicide(board, n[0], n[1], opponentPlayer);
      })
      return isMovePossible
    }
}