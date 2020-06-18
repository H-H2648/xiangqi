import Bing from '../pieces/bing.js';
import Jiang from '../pieces/jiang.js';
import Ju from '../pieces/ju.js';
import Ma from '../pieces/ma.js';
import Pao from '../pieces/pao.js';
import Shi from '../pieces/shi.js';
import Xiang from '../pieces/xiang.js';

//fully initializes the board in the beggining
//puts all the pieces in the right place
//this function is used in the beggining
export default function initializeBoard(){
  const board = [];
  for(var ii=0; ii<10; ++ii) {
      board[ii] = new Array(9);
  }

  board[0][0] = new Ju(1, 0, 0);
  board[0][1] = new Ma(1, 0, 1);
  board[0][2] = new Xiang(1, 0, 2);
  board[0][3] = new Shi(1, 0, 3);
  board[0][4] = new Jiang(1, 0, 4);
  board[0][5] = new Shi(1, 0, 5);
  board[0][6] = new Xiang(1, 0 , 6);
  board[0][7] = new Ma(1, 0, 7);
  board[0][8] = new Ju(1, 0, 8);
  board[2][1] = new Pao(1, 2, 1);
  board[2][7] = new Pao(1, 2, 7);
  board[3][0] = new Bing(1, 3, 0);
  board[3][2] = new Bing(1, 3, 2);
  board[3][4] = new Bing(1, 3, 4);
  board[3][6] = new Bing(1, 3, 6);
  board[3][8] = new Bing(1, 3, 8);
  board[6][0] = new Bing(2, 6, 0);
  board[6][2] = new Bing(2, 6, 2);
  board[6][4] = new Bing(2, 6, 4);
  board[6][6] = new Bing(2, 6, 6);
  board[6][8] = new Bing(2, 6, 8);
  board[7][1] = new Pao(2, 7, 1);
  board[7][7] = new Pao(2, 7, 7);
  board[9][0] = new Ju(2, 9, 0);
  board[9][1] = new Ma(2, 9, 1);
  board[9][2] = new Xiang(2, 9, 2);
  board[9][3] = new Shi(2, 9, 3);
  board[9][4] = new Jiang(2, 9, 4);
  board[9][5] = new Shi(2, 9, 5);
  board[9][6] = new Xiang(2, 9, 6);
  board[9][7] = new Ma(2, 9, 7);
  board[9][8] = new Ju(2, 9, 8);
  return board;
}