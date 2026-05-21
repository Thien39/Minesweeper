const Game = require('./game');
const UI = require('./ui');

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(10, 10, 10); // 10x10 grid with 10 bombs
    const gridElement = document.getElementById('grid');
    const restartButton = document.getElementById('restart');

    UI.createGrid(gridElement, game.grid);
    
    gridElement.addEventListener('click', (event) => {
        const cell = event.target;
        if (cell.classList.contains('cell')) {
            const row = cell.dataset.row;
            const col = cell.dataset.col;
            game.revealCell(row, col);
            UI.updateCell(cell, game.grid[row][col]);
            if (game.checkForBomb(row, col)) {
                UI.showGameOver();
            }
        }
    });

    restartButton.addEventListener('click', () => {
        game.restartGame();
        UI.resetUI(gridElement);
        UI.createGrid(gridElement, game.grid);
    });
});