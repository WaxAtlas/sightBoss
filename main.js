// @ts-check

function resetGame() {
    location.reload();
}

function resetBoard() {
    board?.replaceChildren();
}

function addResetButton() {
    let resetButton = document.createElement("button");
    resetButton.innerText = "Reset";
    resetButton.setAttribute("class", "button");
    resetButton.addEventListener("click", resetGame);
    board?.appendChild(resetButton);
}

function createGrid(N) {
    let cellHeight, cellWidth;
    if (board?.clientHeight && board.clientWidth){
        cellHeight = Math.floor(board?.clientHeight / N) - 2;
        cellWidth = Math.floor(board?.clientWidth / N) - 2;
    }
    else {
        cellHeight = 10;
        cellWidth = 10;
    }

    const squareSize = ((cellHeight < cellWidth) ? cellHeight : cellWidth).toString() + "px";

    for (let i = 0; i < N; i++) {
        let row = document.createElement("div");
        row.style.display = "flex";
        row.style.justifyContent = "center";
        for (let j = 0; j < N; j++) {
            let square = document.createElement("div");
            square.style.height = squareSize;
            square.style.width = squareSize;
            square.setAttribute("class", "cell");

            /** This is to enhance the feel by preventing dragging an element */
            square.onmousedown = (e) => {
                e.preventDefault();
            }
            square.addEventListener("mouseover", (e) => {
                if (e.buttons === 1) {
                    square.style.backgroundColor = "black";
                }
            });
            square.addEventListener("mousedown", (e) => {
                if (e.buttons === 1) {
                    square.style.backgroundColor = "black";
                }
            });

            row.appendChild(square);
        }
        board?.appendChild(row);
    }
}

function tbtButtonHandler() {
    resetBoard();
    addResetButton();
    createGrid(10);
}

function realtimeButtonHandler() {
    resetBoard();
    addResetButton();
    createGrid(15);
}

/** @type {HTMLDivElement | null} */
const board = document.querySelector("#board");

/** @type {HTMLButtonElement | null} */
const tbtButton = document.querySelector("#turnbased");
tbtButton?.addEventListener("click", tbtButtonHandler);

/** @type {HTMLButtonElement | null} */
const realtimeButton = document.querySelector("#realtime");
realtimeButton?.addEventListener("click", realtimeButtonHandler);
