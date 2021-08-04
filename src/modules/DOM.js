const DOM = (() => {
	const DOMplayerBoard = document.getElementById('player-board');
	const DOMAIBoard = document.getElementById('AI-board');
	const DOMBoards = [DOMplayerBoard, DOMAIBoard];

	const startup = (playerBoard, AIboard) => {
		renderBoards();
		renderShips(playerBoard);
		addListeners(AIboard);

		function renderBoards() {
			const boards = [playerBoard, AIboard];

			boards.forEach((board, i) => {
				board.grid.forEach((cell) => {
					const square = document.createElement('div');

					square.setAttribute('data-x', cell.x);
					square.setAttribute('data-y', cell.y);
					square.classList.add('cell');

					DOMBoards[i].appendChild(square);
				});
			});
		}

		function renderShips(board) {
			board.grid.forEach((cell, i) => {
				if (cell.hasShip) {
					DOMplayerBoard.children[i].classList.add('has-ship');
				}
			});
		}

		function addListeners(board) {
			for (let i = 0; i < DOMAIBoard.children.length; i++) {
				const child = DOMAIBoard.children[i];

				child.addEventListener('click', () => {
					board.recieveAttack(child.dataset.x, child.dataset.y);
					renderAttacks(playerBoard, AIboard);
				});
			}
		}
	};

	const renderAttacks = (player, AI) => {
		const boards = [player, AI];
		console.log(player);
		renderMissed();

		function renderMissed() {
			boards.forEach((board, i) => {
				board.grid.forEach((cell, j) => {
					if (cell.missed) {
						DOMBoards[i].children[j].classList.add('missed');
					}
				});
			});
		}
	};

	return { startup };
})();

module.exports = { DOM };
