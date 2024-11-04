let board;
let score = 0;
let rows = 4;
let columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    let boardContainer = document.getElementById("board");
    boardContainer.innerHTML = ""; // Clear the board

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            boardContainer.append(tile);
        }
    }
    setTwo();
    setTwo();
    document.getElementById("score").innerText = score; // Reset the score display
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add('x' + num.toString());
        } else {
            tile.classList.add('x8192');
        }
    }
}

document.addEventListener("keyup", (e) => {
    let moved = false;

    if (e.key == "ArrowLeft") {
        slideLeft();
        moved = true;
    } else if (e.key == "ArrowRight") {
        slideRight();
        moved = true;
    } else if (e.key == "ArrowUp") {
        slideUp();
        moved = true;
    } else if (e.key == "ArrowDown") {
        slideDown();
        moved = true;
    }

    if (moved) {
        setTwo();
        if (checkGameOver()) {
            let lost = document.getElementById('lost');
            lost.innerText = "Game Over!";
        }
    }

    document.getElementById("score").innerText = score;
});

let restartBtn = document.querySelector('#restartBtn');
restartBtn.addEventListener('click', restartGame);

function restartGame() {
    score = 0;
    setGame();
    document.getElementById("score").innerText = score;
    let lost = document.getElementById('lost');
    lost.innerText = ""; // Clear game over message
}

function checkGameOver() {
    if (hasEmptyTile()) {
        return false;
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (c < columns - 1 && board[r][c] === board[r][c + 1]) {
                return false;
            }
            if (r < rows - 1 && board[r][c] === board[r + 1][c]) {
                return false;
            }
        }
    }
    return true;
}

function slide(row) {
    row = filterZeroes(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] *= 0;
            score += row[i];
        }
    }
    row = filterZeroes(row);
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function filterZeroes(row) {
    return row.filter(num => num != 0);
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
