const { renderBoards } = require('./DOM');

function Ship(type, x, y, axis) {
	const length = getShipLength(type);

	function getShipLength(type) {
		if (type === 'carrier') return 5;
		if (type === 'battleship') return 4;
		if (type === 'cruiser') return 3;
		if (type === 'destroyer') return 2;
		if (type === 'submarine') return 1;
	}

	function getCoords() {
		let coords = [];

		if (axis === 'x') {
			if (x + length > 10) {
				for (let i = 10; i > 10 - length; i--) {
					coords.push([i, y]);
				}
			} else {
				for (let i = x; i < x + length; i++) {
					coords.push([i, y]);
				}
			}
		}

		if (axis === 'y') {
			if (y + length > 10) {
				for (let i = 10; i > 10 - length; i--) {
					coords.push([x, i]);
				}
			} else {
				for (let i = y; i < y + length; i++) {
					coords.push([x, i]);
				}
			}
		}

		return coords;
	}

	return {
		type: type,
		axis: axis,
		length: length,
		coords: getCoords(),
		hitAt: [],
		sunk: false,
		hit(n) {
			if (!this.hitAt.includes(n)) this.hitAt.push(n);
			this.isSunk();
		},
		isSunk() {
			if (this.hitAt.length === this.length) this.sunk = true;
		},
	};
}

function Gameboard() {
	function Grid(id, x, y) {
		return {
			id: id,
			x: x,
			y: y,
			hit: false,
			hasShip: false,
			missed: false,
		};
	}

	function generateGrid() {
		let grid = [];

		for (let y = 0; y < 10; y++) {
			for (let x = 0; x < 10; x++) {
				let cellId = grid.length + 1;

				grid.push(new Grid(cellId, x + 1, y + 1));
			}
		}

		return grid;
	}

	function placeShip2(type, x, y, axis, board) {
		const gameboard = board;
		const newShip = new Ship(type, x, y, axis);

		function coordIsClear(x, y) {
			// Returns false if occupied
			const matchingCell = gameboard.grid.find(
				(cell) => cell.x === x && cell.y === y
			);

			if (matchingCell.hasShip === true) return false;
			else return true;
		}
		// PLEASE REFACTOR OR DELETE THIS
		function allCoordsClear(coords) {
			// Takes ship's coordenate array
			// const reducer = (accumulator, currentVal) => {
			// 	accumulator = coordIsClear(currentVal[0], currentVal[1]);
			// 	return accumulator === true
			// };

			// return coords.reduce(reducer); // Returns boolean
			let bools = [];
			coords.forEach((coord) => {
				bools.push(coordIsClear(coord[0], coord[1]));
			});

			return bools.every((val) => val);
		}

		if (!allCoordsClear(newShip.coords)) {
			return false;
		} else if (allCoordsClear(newShip.coords)) {
			gameboard.ships.push(newShip);
			newShip.coords.forEach((coord) => {
				const cell = findCell(gameboard, coord[0], coord[1]);
				cell.hasShip = true;
			});
		}
	}

	// function randomize2() {
	// 	const shipTypes = [
	// 		'carrier',
	// 		'battleship',
	// 		'cruiser',
	// 		'destroyer',
	// 		'destroyer',
	// 		'submarine',
	// 		'submarine',
	// 	];

	// 	const randX = () => Math.round(Math.random() * 9) + 1;
	// 	const randY = () => Math.round(Math.random() * 9) + 1;
	// 	const randAxis = () => {
	// 		if (Math.random() > 0.5) return 'x';
	// 		else return 'y';
	// 	};

	// 	shipTypes.forEach((ship) => {
	// 		const board = this;
	// 		tryShip();
	// 		function tryShip() {
	// 			if (board.placeShip2(ship, randX(), randY(), randAxis()) === false) {
	// 				tryShip();
	// 			}
	// 		}
	// 	});
	// }

	function randomize3() {
		const shipTypes = [
			'carrier',
			'battleship',
			'cruiser',
			'destroyer',
			'destroyer',
			'submarine',
			'submarine',
		];

		const randAxis = () => {
			if (Math.random() > 0.5) return 'x';
			else return 'y';
		};

		const board = this;
		const randIndex = (length) => Math.round(Math.random() * length);
		let illegalCells = [];
		let legalCells = [];






		const sortCells = (board) => {
			//illegalCells = [];
			legalCells = [];

			board.grid.forEach((cell) => {
				if (cell.hasShip) {
					illegalCells.push(cell);
					addWhitespace(cell, illegalCells);
				}
			});

			board.grid.forEach((cell) => {
				if (!illegalCells.includes(cell)) {
					legalCells.push(cell);
				}
			});
		};






		const coordsAreLegal = (coordList) => {
			let shipCells = [];

			const isLegal = (cell) => legalCells.includes(cell);

			coordList.forEach((pair) => {
				shipCells.push(findCell(board, pair[0], pair[1]));
			});

			if (shipCells.every(isLegal)) return true;
			else return false;
		};

		const addWhitespace = (toCell, storeIn) => {
			const x = toCell.x;
			const y = toCell.y;

			if (y > 0) {
				storeIn.push(findCell(board, x, y - 1)); //top
			}

			if (x < 10) {
				storeIn.push(findCell(board, x + 1, y)); //right
			}

			if (y < 10) {
				storeIn.push(findCell(board, x, y + 1)); //bottom
			}

			if (x > 0) {
				storeIn.push(findCell(board, x - 1, y)); //left
			}
		};

		const tryShip = (type) => {
			const randomLegalCell = legalCells[randIndex(legalCells.length)];
			const x = randomLegalCell.x;
			const y = randomLegalCell.y;
			const axis = randAxis();
			const newShip = new Ship(type, x, y, axis);
			const shipCoords = newShip.coords;

			console.log(type, x, y, axis, board);

			if (coordsAreLegal(shipCoords) === false) {tryShip(type)}
			
			else if (coordsAreLegal(shipCoords)) {placeShip2(type, x, y, axis, board)}
		};

		function placeShips() {
			shipTypes.forEach((type) => {
				sortCells(board);
				tryShip(type);
				//console.log(legalCells);
				//console.log(illegalCells);
			});
		}

		placeShips();
		// place a ship at random

		//populate avaliable pool array  (include 1 tile whitespace)
		//generate random index from 0 to .length
		//check if the coords provided by the randIndex create ship with clearance
		// else fail and repeat
		//place the ship, continue
	}

	function recieveAttack(x, y) {
		let missed = false;

		this.ships.forEach((ship) => {
			for (let i = 0; i < ship.coords.length; i++) {
				const coordPair = ship.coords[i];
				if (coordPair[0] === x && coordPair[1] === y) {
					ship.hit(i);
					return;
				} else {
					missed = true;
				}
			}
		});

		this.grid.forEach((cell) => {
			if (cell.x === x && cell.y === y) {
				cell.hit = true;
				if (missed) {
					cell.missed = true;
				}
			}
		});
	}

	function gameoverEval() {
		let sunkenShips = [];

		this.ships.forEach((ship) => {
			sunkenShips.push(ship.sunk);
		});
		return sunkenShips.every((val) => val);
	}

	function findCell(board, x, y) {
		return board.grid.find((cell) => cell.x === x && cell.y === y);
	}

	return {
		grid: generateGrid(),
		ships: [],
		placeShip2,
		randomize3,
		recieveAttack,
		gameoverEval,
	};
}

function Player(name) {
	function play(board) {
		let randX = Math.round(Math.random() * 9) + 1;
		let randY = Math.round(Math.random() * 9) + 1;

		board.grid.forEach((cell) => {
			if (cell.x === randX && cell.y === randY) {
				if (cell.hit) {
					play(board);
					return;
				} else {
					board.recieveAttack(randX, randY);
				}
			}
		});
	}

	return {
		name: name,
		isTurn: false,
		isAI: false,
		play,
	};
}

const run = (() => {
	const playerBoard = new Gameboard();
	const AIBoard = new Gameboard();

	playerBoard.randomize3();
	AIBoard.randomize3();

	renderBoards(playerBoard, AIBoard);

	console.log(playerBoard);
	console.log(AIBoard);
})();

module.exports = { Ship, Gameboard, Player, run };
