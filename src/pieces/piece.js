// imports lodash so I can use deepcopy (copies an array without direct reference)
// just importing deepcopy doesn't make the function work for some reason so I just inefficiently imported the whole thing
import cloneBoard from "../helper/boardClone.js"
import Empty from './empty.js'



//general properties of a piece. It has a player, appearances, posx, posy
export default class Piece {
    constructor(player, iconUrl, posx, posy, type){
      this.player = player;
      this.style = {backgroundImage: "url('"+iconUrl+"')"};
      this.posx = posx
      this.posy = posy
      this.type = type
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

      if (board[positionx][positiony].player !== this.player){
        list.push([positionx, positiony])
      }
    }

    //checks if going to the point, [positionx, positiony], is suicidal
    isSuicide(board, positionx, positiony, opponentPlayer){
      const theoreticalPoints = cloneBoard(board)
      theoreticalPoints[positionx][positiony] = theoreticalPoints[this.posx][this.posy]
      theoreticalPoints[positionx][positiony].posx = positionx
      theoreticalPoints[positionx][positiony].posy = positiony
      theoreticalPoints[this.posx][this.posy] = new Empty(this.posx, this.posy)
      if (this.posx === 2 && this.posy === 4 && positionx === 6 && positiony === 4){
        console.log(theoreticalPoints)
      }
      //checks for suicide
      if (this.player.isInDanger(theoreticalPoints, opponentPlayer)){
        return true;
      }
      return false;
    }

    fullSafeList(board, opponentPlayer){
      const isMovePossible = this.isMovePossible(board)
      //for some reason "this" doesn't really work inside {} so I will just make another reference
      var reference = this
      var fullSafeList = isMovePossible.filter(function(value){
        const OGX = reference.player.kingPosx
        const OGY = reference.player.kingPosy
        //if we are theoretically moving the king, we also need to theoretically change the king position stored inside player
        if (reference.type === "Jiang"){
          reference.player.kingPosx = value[0]
          reference.player.kingPosy = value[1]
        }
        const truth = !(reference.isSuicide(board, value[0], value[1], opponentPlayer))
        //we will need to bring it back
        reference.player.kingPosx = OGX
        reference.player.kingPosy = OGY
        return truth;
      })
      return fullSafeList
    }
}