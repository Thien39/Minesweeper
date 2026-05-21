class Game {
    constructor(size = 10, bombCount = 10) {
        this.size = size;
        this.bombCount = bombCount;
        this.grid = [];
        this.gameOver = false;
        this.initializeGame();
    }

    initializeGame() {
        this.grid = this.createGrid();
        this.placeBombs();
        this.calculateProximity();
    }

    createGrid() {
        return Array.from({ length: this.size }, () => Array(this.size).fill({ isRevealed: false, isBomb: false, proximity: 0 }));
    }

    placeBombs() {
        let bombsPlaced = 0;
        while (bombsPlaced < this.bombCount) {
            const x = Math.floor(Math.random() * this.size);
            const y = Math.floor(Math.random() * this.size);
            if (!this.grid[x][y].isBomb) {
                this.grid[x][y].isBomb = true;
                bombsPlaced++;
            }
        }
    }

    calculateProximity() {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.grid[x][y].isBomb) {
                    this.updateProximity(x, y);
                }
            }
        }
    }

    updateProximity(x, y) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newX = x + i;
                const newY = y + j;
                if (this.isInBounds(newX, newY) && !this.grid[newX][newY].isBomb) {
                    this.grid[newX][newY].proximity++;
                }
            }
        }
    }

    isInBounds(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    revealCell(x, y) {
        if (this.gameOver || this.grid[x][y].isRevealed) return;

        this.grid[x][y].isRevealed = true;

        if (this.grid[x][y].isBomb) {
            this.gameOver = true;
            return true; // Game over
        }

        if (this.grid[x][y].proximity === 0) {
            this.revealAdjacentCells(x, y);
        }

        return false; // Continue game
    }

    revealAdjacentCells(x, y) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newX = x + i;
                const newY = y + j;
                if (this.isInBounds(newX, newY)) {
                    this.revealCell(newX, newY);
                }
            }
        }
    }

    restartGame() {
        this.gameOver = false;
        this.initializeGame();
    }
}

export default Game;