import Player from './player';

const Gameboard = require('./gameboard');
const { DOM } = require('./DOM');

const playerBoard = new Gameboard();
const AIBoard = new Gameboard();
const human = new Player();
const AI = new Player();
AI.name = 'Computer';
human.isTurn = true;
human.name = 'Human';

function runGame() {
	playerBoard.randomize();
	AIBoard.randomize();

	DOM.startup();
}

export { playerBoard, AIBoard, runGame, human, AI };
