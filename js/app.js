"use strict";

const EMPTY = "&nbsp;";
const SIZE = 3;
let boxes = [];
let turn = "X";
let score;
let moves;

class GameController {
    constructor() {
        this.gameView = new GameView(this);
        this.gameView.renderBoard();
    }

    resetGame() {
        score = {
            "X": 0,
            "O": 0
        };
        moves = 0;
        turn = "X";
        this.gameView.startNewGame();
    }

    isWin(clicked) {
        // Get all cell classes
        const memberOf = clicked.className.split(/\s+/);
        for (let i = 0; i < memberOf.length; i++) {
            const testClass = '.' + memberOf[i];
            const elements = document.querySelectorAll('#tictactoe ' + testClass);
            const items = [].filter.call(elements, function(element) {
                return RegExp(turn).test(element.textContent);
            });
            // winning condition: turn == N_SIZE
            if (items.length == SIZE) {
                return true;
            }
        }
        return false;
    }
}

class GameView {
    constructor(gameController) {
        this.gameController = gameController;
        this.tictactoeBoard = document.getElementById('tictactoe');
    }

    startNewGame() {
        boxes.forEach(function (square) {
            square.innerHTML = EMPTY;
        });
    }
        
    renderBoard() {
        const board = document.createElement('table');
        let identifier = 1;
        const me = this;
        board.setAttribute("border", 1);
        board.setAttribute("cellspacing", 0);

        for(let i = 0; i < SIZE; ++i) {
            const row = document.createElement('tr');
            board.appendChild(row);
            for(let j = 0; j < SIZE; ++j) {
                const cell = document.createElement('td');
                cell.setAttribute('height', 120);
                cell.setAttribute('width', 120);
                cell.setAttribute('align', 'center');
                cell.setAttribute('valign', 'center');
                cell.classList.add('col' + j,'row' + i);

                if (i == j) {
                    cell.classList.add('diagonal0');
                }
                if (j == SIZE - i - 1) {
                    cell.classList.add('diagonal1');
                }
                cell.identifier = identifier;
                cell.addEventListener("click", function() {
                    if (this.innerHTML !== EMPTY) {
                        return;
                    }
                    this.innerHTML = turn;
                    moves += 1;
                    score[turn] += this.identifier;
                    if (me.gameController.isWin(this)) {
                        document.getElementById('turn').textContent = 'Winner: Player ' + turn;
                        setTimeout(()=>me.gameController.resetGame(), 3000);
                    } else if (moves === SIZE * SIZE) {
                        document.getElementById('turn').textContent = "Draw";
                        setTimeout(()=>me.gameController.resetGame(), 3000);
                    } else {
                        turn = turn === "X" ? "O" : "X";
                        document.getElementById('turn').textContent = 'Player ' + turn;
                    }
                });
                row.appendChild(cell);
                boxes.push(cell);
                identifier += identifier;
            }
        }
        document.getElementById("tictactoe").appendChild(board);
        this.gameController.resetGame();
    }
}

const gameController = new GameController();