const { DOM } = require('./DOM');

function Player(name) {
	function play(board) {
		const randX = Math.round(Math.random() * 9) + 1;
		const randY = Math.round(Math.random() * 9) + 1;
		const cell = findCell(board, randX, randY);

		if (cell.hit) {
			play(board);
			return;
		} else if (!this.foundShip) {
			board.recieveAttack(cell.x, cell.y);
		}


		if (cell.hasShip) {
			this.foundShip = true;
			this.foundShipCoords = [cell.x, cell.y];
			let ship = findShipInCoords(board, cell.x, cell.y);
			console.log(ship);

			if (ship.hitAt.length < 2) {
				let randomCell = getRandomAdjacentCell(board, cell.x, cell.y);
				while (randomCell === undefined) {
					 randomCell = getRandomAdjacentCell(board, cell.x, cell.y)
				}
				board.recieveAttack(randomCell.x, randomCell.y);
			}

			if (ship.hitAt.length >= 2) {
				let shipCoords = ship.coords;
				let nextCell = shipCoords.find((pair) => {
					return findCell(board, pair[0], pair[1]).hit === false;
				});
				console.log(nextCell);
				board.recieveAttack(nextCell.x, nextCell.y);
			}
		}
	}

	function getAdjacentCells(board, x, y) {
		const top = findCell(board, x, y - 1);
		const right = findCell(board, x + 1, y);
		const bottom = findCell(board, x, y + 1);
		const left = findCell(board, x - 1, y);

		return {
			top: top,
			right: right,
			bottom: bottom,
			left: left,
			array: [top, right, bottom, left],
		};
	}

	function getRandomAdjacentCell(board, x, y) {
		const randNum = Math.floor(Math.random() * 5);
		const randomAjacentCell = getAdjacentCells(board, x, y).array[randNum];
		
		return randomAjacentCell
		
	}

	function findShipInCoords(board, x, y) {
		const ships = board.ships;
		return ships.find((ship) => {
			return ship.coords.some((pair) => {
				return pair[0] == x && pair[1] == y;
			});
		});
	}

	function findCell(board, x, y) {
		return board.grid.find((cell) => cell.x == x && cell.y == y);
	}

	return {
		name: name,
		isTurn: false,
		play,
		findShipInCoords,
	};
}

module.exports = Player;
