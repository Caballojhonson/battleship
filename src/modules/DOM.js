
const playerBoard = document.getElementById('player-board')
const AIBoard = document.getElementById('AI-board')

const elems = [playerBoard, AIBoard];

function renderBoards(b1, b2) {
    const boards = [b1, b2];

    boards.forEach((board, i) => {
        board.grid.forEach((cell) => {
            const square = document.createElement('div');
    
            square.setAttribute('data-x', cell.x);
            square.setAttribute('data-y', cell.y);
            square.classList.add('cell');
    
            elems[i].appendChild(square);
        })
    })
    renderShips(boards)
}

function renderShips(boards) {

    boards.forEach((board, i) => {
        board.grid.forEach((cell, j) => {
            if (cell.hasShip) {
                elems[i].children[j].classList.add('has-ship')
            }
        })
    })
}

module.exports = {renderBoards}