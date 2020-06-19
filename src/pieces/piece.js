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
      console.log(board)
      console.log(positionx)
      console.log(positiony)
      console.log(board[positionx])
      if (board[positionx][positiony] === undefined || board[positionx][positiony].player !== this.player){
        list.push([positionx, positiony])
      }
  }
}