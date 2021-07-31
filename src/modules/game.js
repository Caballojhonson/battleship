function Ship(type, length) {
	return {
		type: type,
        axis: x,
		length: length,
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
        }
    }

    function generateGrid() {
        let grid = [];

        for (let y = 0; y < 10; y++) {
            for(let x = 0; x < 10; x++) {
                let cellId = grid.length + 1; 

                grid.push(new Grid(cellId, x + 1, y + 1))
            }
        }

        return grid;
    }

    function getShipLength(type) {
        if(type === 'carrier') return 5;
        if(type === 'battleship') return 4;
        if(type === 'cruiser') return 3;
        if(type === 'destroyer') return 2;
        if(type === 'submarine') return 1;
    }

	return {
        grid: generateGrid(),
		ships: {
			carrier: [],
			battleship: [],
			cruiser: [],
			destroyer: [],
			submarine: [],
		},
        placeShip(ship, x, y) {
            this.ships[ship] = new Ship(ship, getShipLength(ship));

            0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

            this.ships[ship].coords.x = x;
            this.ships[ship].coords.y = y;
        }
	};
}

let testBoard = new Gameboard();


module.exports = { testBoard, Ship};

// Ship types: Carrier(5), Battleship(4), Cruiser(3), Destroyer(2) x2, Submarine(1), x2.
