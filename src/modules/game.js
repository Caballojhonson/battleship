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

	function placeShip(type, x, y, axis) {
		const newShip = new Ship(type, x, y, axis);
		this.ships.push(newShip);

		newShip.coords.forEach((coord) => {
			for (let i = 0; i < this.grid.length; i++) {
				const cell = this.grid[i];

				if (!cell.hasShip) {
					if (coord[0] === cell.x && coord[1] === cell.y) {
						cell.hasShip = true;
					}
				}
			}
		});
	}

	function randomize() {
		const gameboard = this;
		const shipTypes = [
			'carrier',
			'battleship',
			'cruiser',
			'destroyer',
			'destroyer',
			'submarine',
			'submarine',
		];
		const randX = () => Math.round(Math.random() * 9) + 1;
		const randY = () => Math.round(Math.random() * 9) + 1;
		const randAxis = () => {
			if (Math.random() > 0.5) return 'x';
			else return 'y';
		};

		function occupiedCells() {
			return gameboard.grid.filter((cell) => cell.hasShip);
		}

		function coordsAreClear(ship) {
			let results = [];

			ship.coords.forEach((pair) => {
				occupiedCells().forEach((cell) => {
					if (pair[0] === cell.x && pair[1] === cell.y) {
						results.push(false);
					}
				});
			});
			return results.every((val) => val);
		}

		function validateShip(type) {
			const newShip = new Ship(type, randX(), randY(), randAxis());

			if (coordsAreClear(newShip)) return newShip;
			else validateShip(type);
		}

		function placeShips() {
			shipTypes.forEach((ship) => {
				const newShip = validateShip(ship);

				gameboard.ships.push(newShip);
			});
		}

		placeShips();
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

	return {
		grid: generateGrid(),
		ships: [],
		placeShip,
		randomize,
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

	playerBoard.randomize();
	AIBoard.randomize();

	console.log(playerBoard);
	console.log(AIBoard);

	return { playerBoard, AIBoard };
})();

module.exports = { Ship, Gameboard, Player, run };
