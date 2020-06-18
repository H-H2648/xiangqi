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

    arraysEqual(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length != b.length) return false;
    
      // If you don't care about the order of the elements inside
      // the array, you should sort both arrays here.
      // Please note that calling sort on an array will modify that array.
      // you might want to clone your array first.
    
      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }
  
  //finds if a is inside b (the array); a helper function lol
    arrayIncludes(a, b){
      for (var ii = 0; ii < b.length; ++ii){
          if (this.arraysEqual(b[ii], a)){
              return true
          }
      }
      return false
    }
}