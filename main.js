// @ts-check

function resetBoard() {
    grid?.replaceChildren();
}

function addResetButton() {
    let resetButton = document.createElement("button");
    resetButton.innerText = "Reset";
    // resetButton.setAttribute("class", "button");
    resetButton.addEventListener("click", resetButtonHandler);
    grid?.appendChild(resetButton);
}

function addArrowKeys() {
    let upButton = document.createElement("button");
    upButton.innerHTML = "↑";
    upButton.setAttribute("class", "arrowKey");
    upButton.addEventListener("click", upButtonHandler);
    
    let downButton = document.createElement("button");
    downButton.innerText = "↓";
    downButton.setAttribute("class", "arrowKey");
    downButton.addEventListener("click", downButtonHandler);
    
    let leftButton = document.createElement("button");
    leftButton.innerText = "←";
    leftButton.setAttribute("class", "arrowKey");
    leftButton.addEventListener("click", leftButtonHandler);
    
    let rightButton = document.createElement("button");
    rightButton.innerText = "→";
    rightButton.setAttribute("class", "arrowKey");
    rightButton.addEventListener("click", rightButtonHandler);
    
    let topRow = document.createElement("div");
    topRow.setAttribute("class", "row");
    topRow?.appendChild(upButton);
    arrowKeys?.appendChild(topRow);
    
    let bottomRow = document.createElement("div");
    bottomRow.setAttribute("class", "row");
    bottomRow?.appendChild(leftButton);
    bottomRow?.appendChild(downButton);
    bottomRow?.appendChild(rightButton);
    arrowKeys?.appendChild(bottomRow);
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
        row.setAttribute("class", "row");
        for (let j = 0; j < N; j++) {
            let square = document.createElement("div");
            square.style.height = squareSize;
            square.style.width = squareSize;
            square.setAttribute("class", "cell");

            // /** This is to enhance the feel by preventing dragging an element */
            // square.onmousedown = (e) => {
            //     e.preventDefault();
            // }
            // square.addEventListener("mouseover", (e) => {
            //     if (e.buttons === 1) {
            //         square.style.backgroundColor = "black";
            //     }
            // });
            // square.addEventListener("mousedown", (e) => {
            //     if (e.buttons === 1) {
            //         square.style.backgroundColor = "black";
            //     }
            // });

            row.appendChild(square);
        }
        grid?.appendChild(row);
    }
}

function tbtButtonHandler() {
    resetBoard();
    addResetButton();
    addArrowKeys();
    createGrid(10);
}

function realtimeButtonHandler() {
    resetBoard();
    addResetButton();
    addArrowKeys();
    createGrid(15);
}

function resetButtonHandler() {
    location.reload();
}

function upButtonHandler() {
    console.log("up button pressed");
}

function downButtonHandler() {
    console.log("down button pressed");
}

function leftButtonHandler() {
    console.log("left button pressed");
}

function rightButtonHandler() {
    console.log("right button pressed");
}

/** @type {HTMLDivElement | null} */
const board = document.querySelector("#board");

/** @type {HTMLDivElement | null} */
const grid = document.querySelector("#grid");

/** @type {HTMLDivElement | null} */
const arrowKeys = document.querySelector("#arrowKeys");

/** @type {HTMLButtonElement | null} */
const tbtButton = document.querySelector("#turnbased");
tbtButton?.addEventListener("click", tbtButtonHandler);

/** @type {HTMLButtonElement | null} */
const realtimeButton = document.querySelector("#realtime");
realtimeButton?.addEventListener("click", realtimeButtonHandler);
