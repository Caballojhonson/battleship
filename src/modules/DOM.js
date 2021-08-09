import { playerBoard, AIBoard, human, AI } from './game';
import flame from '../icons/flame.png';

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
					if(human.isTurn) {
					board.recieveAttack(child.dataset.x, child.dataset.y);
					if(board.gameoverEval()){congratulateWinner(human)}
					renderAttacks(AIBoard, i, child);
					human.isTurn = false;
					setTimeout(() => {
						AI.play(playerBoard);
						if(playerBoard.gameoverEval()){congratulateWinner(AI)}
						bruteForceRender()
						human.isTurn = true;
				}, 200)
					console.log(AI);
					}
				});
			}
		}
	};

	const bruteForceRender = () => {
		playerBoard.grid.forEach((cell) => {
			const DOMcell = DOMplayerBoard.children[cell.id - 1]
			if (cell.missed) {
				DOMcell.classList.add('missed');
			}
			if (cell.hasShip && cell.hit) {
				if(DOMcell.children.length < 1) {
				DOMcell.appendChild(makeFlame());
				}
				DOMcell.classList.add('has-ship');
			}
		})
	}

	const renderAttacks = (board, cellIndex, DOMcell) => {
		const boardCell = board.grid[cellIndex];

		renderMissed();
		renderHits();

		function renderMissed() {
			if (boardCell.missed) {
				DOMcell.classList.add('missed');
			}
		}

		function renderHits() {
			if (boardCell.hasShip && boardCell.hit) {
				if(DOMcell.children.length < 1) {
				DOMcell.appendChild(makeFlame());
				}
				DOMcell.classList.add('has-ship');
			}
		}
		
	};

	function makeFlame() {
		const flameIcon = new Image();
		flameIcon.src = flame;
		flameIcon.classList.add('hit');
		return flameIcon;
	}

	function congratulateWinner(player) {
		let winScreen = document.getElementById('winner-screen');
		winScreen.textContent = `${player.name} Wins!`;
		winScreen.style.display = 'flex'
	}

	return { startup, renderAttacks };
})();

export { DOM };
