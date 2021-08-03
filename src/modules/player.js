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

module.exports = Player