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

module.exports = Ship;