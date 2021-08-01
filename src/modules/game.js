function Ship(type, x, y, axis) {
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
			for (let i = Math.floor(x - length / 2); i < length; i++) {
				coords.push([i, y]);
			}
		}

		if (axis === 'y') {
			for (let i = Math.floor(y - length / 2); i < length; i++) {
				coords.push([x, i]);
			}
		}
	}

	return {
		type: type,
		axis: axis,
		length: length,
		coords: [],
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

	return {
		grid: generateGrid(),
	};
}

let testBoard = new Gameboard();

module.exports = { testBoard, Ship, Gameboard };

// Ship types: Carrier(5), Battleship(4), Cruiser(3), Destroyer(2) x2, Submarine(1), x2.
