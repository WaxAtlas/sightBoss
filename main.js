// @ts-check

let gridSize = 0;
const gridState = [];

function resetBoard() {
    grid?.replaceChildren();
}

function addResetButton() {
    let resetButton = document.createElement("button");
    resetButton.innerText = "Reset";
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

function createGrid(N, islands) {
    let cellHeight, cellWidth;
    if (board?.clientHeight && board.clientWidth){
        cellHeight = Math.floor(board?.clientHeight / N) - 2;
        cellWidth = Math.floor(board?.clientWidth / N) - 2;
    }
    else {
        cellHeight = 10;
        cellWidth = 10;
    }

    console.log(islands);

    const squareSize = ((cellHeight < cellWidth) ? cellHeight : cellWidth).toString() + "px";

    for (let i = 0; i < N; i++) {
        gridState[i] = [];

        let row = document.createElement("div");
        row.setAttribute("class", "row");

        for (let j = 0; j < N; j++) {
            gridState[i][j] = "";
        
            let square = document.createElement("div");
            square.style.height = squareSize;
            square.style.width = squareSize;
            square.setAttribute("class", "cell");
            square.dataset.row = i.toString();
            square.dataset.col = j.toString();

            let isIsland = false;
            islands.forEach(island => {
                if (island[0] === i && island[1] === j) {
                    isIsland = true;
                }
            });
            if (isIsland) {
                square.style.backgroundColor = "black";
                // square.innerText = "island";

                gridState[i][j] = "island";
            }
            else {
                // square.innerText = "X";
                gridState[i][j] = "X";
            }

            row.appendChild(square);
        }
        grid?.appendChild(row);
    }

    updateGrid();
}

function tbtButtonHandler(e) {
    resetBoard();
    addResetButton();
    addArrowKeys();

    let islands;
    switch(e.currentTarget.innerText) {
        case "Alpha":
            islands = [[1, 5], [2, 1], [3, 8], [4, 3], [5, 1], [6, 8], [7, 3], [7, 5]];
            break;
        case "Bravo":
            break;
        case "Charlie":
            break;
        default:
            console.log("Error");
            break;
    }

    createGrid(10, islands);
    gridSize = 10;
}

function rtButtonHandler(e) {
    resetBoard();
    addResetButton();
    addArrowKeys();

    let islands;
    switch(e.innerText) {
        case "Alpha":
            break;
        case "Bravo":
            break;
        case "Charlie":
            break;
        default:
            console.log("Error");
            break;
    }

    createGrid(15, islands);
    gridSize = 15;
}

function updateGrid() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        cell.innerText = gridState[row][col];
    });

    console.log(gridState);
}

function updateGridState(addElements, removeElements) {
    // console.log("addElements", addElements);
    // console.log("removeElements", removeElements);

    addElements.forEach(element => {
        gridState[element[0]][element[1]] = "X";
    });
    removeElements.forEach(element => {
        gridState[element[0]][element[1]] = "";
    });

    updateGrid();
}

function moveN() {
    let addElements = [];
    let removeElements = [];

    // console.log(gridState);

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (row >= 1) {
            if (gridState[row - 1][col] === "") {
                addElements.push([row - 1, col]);
            }
        }
        if (row <= gridSize - 2) {
            if (gridState[row + 1][col] === "" || gridState[row + 1][col] === "island") {
                if (gridState[row][col] != "island") {
                    removeElements.push([row, col]);
                }
            }
        }
        if (row === gridSize - 1) {
            removeElements.push([row, col]);
        }
    });

    updateGridState(addElements, removeElements);
}

function moveE() {
    let addElements = [];
    let removeElements = [];

    // console.log(gridState);

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (col <= 8) {
            if (gridState[row][col + 1] === "") {
                addElements.push([row, col + 1]);
            }
        }
        if (col >= 1) {
            if (gridState[row][col - 1] === "" || gridState[row][col - 1] === "island") {
                if (gridState[row][col] != "island") {
                    removeElements.push([row, col]);
                }
            }
        }
        if (col === 0) {
            removeElements.push([row, col]);
        }
    });

    updateGridState(addElements, removeElements);
}

function moveS() {
    let addElements = [];
    let removeElements = [];

    // console.log(gridState);

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (row <= 8) {
            if (gridState[row + 1][col] === "") {
                addElements.push([row + 1, col]);
            }
        }
        if (row >= 1) {
            if (gridState[row - 1][col] === "" || gridState[row - 1][col] === "island") {
                if (gridState[row][col] != "island") {
                    removeElements.push([row, col]);
                }
            }
        }
        if (row === 0) {
            removeElements.push([row, col]);
        }
    });

    updateGridState(addElements, removeElements);
}

function moveW() {
    let addElements = [];
    let removeElements = [];

    // console.log(gridState);

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (col >= 1) {
            if (gridState[row][col - 1] === "") {
                addElements.push([row, col - 1]);
            }
        }
        if (col <= gridSize - 2) {
            if (gridState[row][col + 1] === "" || gridState[row][col + 1] === "island") {
                if (gridState[row][col] != "island") {
                    removeElements.push([row, col]);
                }
            }
        }
        if (col === gridSize - 1) {
            removeElements.push([row, col]);
        }
    });

    updateGridState(addElements, removeElements);
}

function resetButtonHandler() {
    location.reload();
}

function upButtonHandler() {
    moveN();
}

function downButtonHandler() {
    moveS();
}

function leftButtonHandler() {
    moveW();
}

function rightButtonHandler() {
    moveE();
}

/** @type {HTMLDivElement | null} */
const board = document.querySelector("#board");

/** @type {HTMLDivElement | null} */
const grid = document.querySelector("#grid");

/** @type {HTMLDivElement | null} */
const arrowKeys = document.querySelector("#arrowKeys");

/** @type {NodeListOf<HTMLButtonElement>} */
const tbtButtons = document.querySelectorAll(".tbtButton");
tbtButtons.forEach(button => { button.addEventListener("click", tbtButtonHandler)})

/** @type {NodeListOf<HTMLButtonElement>} */
const rtButtons = document.querySelectorAll(".rtButton");
rtButtons.forEach(button => { button.addEventListener("click", rtButtonHandler)})
