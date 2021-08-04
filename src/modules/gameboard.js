const Ship = require('./ship');

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

	function placeShip(type, x, y, axis, board) {
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
		// PLEASE REFACTOR OR REPLACE THIS
		function allCoordsClear(coords) {
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

	function randomize() {
		const shipTypes = [
			'carrier',
			'battleship',
			'cruiser',
			'destroyer',
			'destroyer',
			'submarine',
			'submarine',
		];
		const board = this;
		const randIndex = (length) => Math.floor(Math.random() * length);
		let illegalCells = [];
		let legalCells = [];
		const randAxis = () => {
			if (Math.random() > 0.5) return 'x';
			else return 'y';
		};

		const sortCells = (board) => {
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

			if (coordsAreLegal(shipCoords) === false) {
				tryShip(type);
			} else if (coordsAreLegal(shipCoords)) {
				placeShip(type, x, y, axis, board);
			}
		};

		function placeShips() {
			shipTypes.forEach((type) => {
				sortCells(board);
				tryShip(type);
			});
		}

		placeShips();
	}

	function recieveAttack(x, y) {
		let matchingCell = findCell(this, parseInt(x), parseInt(y));

		matchingCell.hit = true;
		if (!matchingCell.hasShip) matchingCell.missed = true;

		this.ships.forEach((ship) => {
			for (let i = 0; i < ship.coords.length; i++) {
				const coordPair = ship.coords[i];

				if (coordPair[0] == x && coordPair[1] == y) {
					ship.hit(i);
				}
			}
		});
	}

	function gameoverEval() {
		return this.ships.every((ship) => ship.sunk);
	}

	function findCell(board, x, y) {
		return board.grid.find((cell) => cell.x === x && cell.y === y);
	}

	return {
		grid: generateGrid(),
		ships: [],
		placeShip,
		randomize,
		recieveAttack,
		gameoverEval,
	};
}

module.exports = Gameboard;
