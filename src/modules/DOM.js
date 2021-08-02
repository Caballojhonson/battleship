const { run } = require("./game")

function renderBoards() {
    const playerBoard = document.getElementById('player-board')
    const AIBoard = document.getElementById('AI-board')

    run.playerBoard.grid.forEach((cell) => {
        const square = document.createElement('div');

        square.setAttribute('data-x', cell.x);
        square.setAttribute('data-y', cell.y);
        square.classList.add('cell');

        playerBoard.appendChild(square)
    })
}