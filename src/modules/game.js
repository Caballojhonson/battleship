const { renderBoards } = require('./DOM');
const Gameboard = require('./gameboard');

const playerBoard = new Gameboard();
const AIBoard = new Gameboard();

playerBoard.randomize();
AIBoard.randomize();

renderBoards(playerBoard, AIBoard);

console.log(playerBoard);
console.log(AIBoard);
