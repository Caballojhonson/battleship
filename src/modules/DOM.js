import { playerBoard, AIBoard } from "./game";

const DOM = (() => {
	const DOMplayerBoard = document.getElementById('player-board');
	const DOMAIBoard = document.getElementById('AI-board');
	const DOMBoards = [DOMplayerBoard, DOMAIBoard];

	const startup = () => {
		console.log(AIBoard);
		renderBoards();
		renderShips(playerBoard);
		addListeners(AIBoard);

		function renderBoards() {
			const boards = [playerBoard, AIBoard];
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
					renderAttacks(i, child);
					//console.log(board.gameoverEval());
				});
			}
		}
	};

	const renderAttacks = (cellIndex, DOMcell) => {
		const boards = [playerBoard, AIBoard];
		renderMissed();
		renderHits();

		function renderMissed() {
			boards.forEach((board, i) => {
				board.grid.forEach((cell, j) => {
					if (cell.missed) {
						DOMBoards[i].children[j].classList.add('missed');
					}
				});
			});
		}

		function renderHits() {
			const boardCell = AIBoard.grid[cellIndex]
			if(boardCell.hasShip && boardCell.hit) {
				DOMcell.classList.add('hit')
			}
		}
	};

	return { startup };
})();

export {DOM}
