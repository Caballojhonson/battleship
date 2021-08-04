const Gameboard = require('./gameboard');
const { DOM } = require('./DOM');

function setup() {
const playerBoard = new Gameboard();
const AIBoard = new Gameboard();

playerBoard.randomize();
AIBoard.randomize();

DOM.startup(playerBoard, AIBoard)

console.log(playerBoard);
console.log(AIBoard);


}

module.exports = { setup }