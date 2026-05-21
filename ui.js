function createGrid(size) {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => {
                cellClicked(i, j);
            });
            gridContainer.appendChild(cell);
        }
    }
}

function updateCell(row, col, content) {
    const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    cell.textContent = content;
    cell.classList.add('revealed');
}

function showGameOver() {
    const message = document.getElementById('message');
    message.textContent = 'Game Over! Click Restart to play again.';
    message.classList.add('game-over');
}

function resetUI() {
    const message = document.getElementById('message');
    message.textContent = '';
    message.classList.remove('game-over');
}

export { createGrid, updateCell, showGameOver, resetUI };