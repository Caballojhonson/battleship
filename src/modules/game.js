const Gameboard = require('./gameboard');
const { DOM } = require('./DOM');

const playerBoard = new Gameboard();
const AIBoard = new Gameboard();

function runGame() {
	playerBoard.randomize();
	AIBoard.randomize();

	DOM.startup();
}

export { playerBoard, AIBoard, runGame };
