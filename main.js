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
    if (board?.clientHeight && board.clientWidth) {
        cellHeight = Math.floor(board?.clientHeight / N) - 2;
        cellWidth = Math.floor(board?.clientWidth / N) - 2;
    }
    else {
        cellHeight = 10;
        cellWidth = 10;
    }

    const squareSize = ((cellHeight < cellWidth) ? cellHeight : cellWidth).toString() + "px";

    for (let i = 0; i < N; i++) {
        gridState[i] = [];

        let row = document.createElement("div");
        row.setAttribute("class", "row");

        for (let j = 0; j < N; j++) {
            gridState[i][j] = "";

            let cell = document.createElement("div");
            cell.style.height = squareSize;
            cell.style.width = squareSize;
            cell.setAttribute("class", "cell");
            cell.dataset.row = i.toString();
            cell.dataset.col = j.toString();

            let isIsland = false;
            islands.forEach(island => {
                if (island.row === i && island.col === j) {
                    isIsland = true;
                }
            });
            if (isIsland) {
                cell.style.backgroundColor = "black";
                // square.innerText = "island";

                gridState[i][j] = "island";
            }
            else {
                // square.innerText = "X";
                gridState[i][j] = "X";
                cell.addEventListener("click", cellButtonHandler);
            }

            row.appendChild(cell);
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
    switch (e.currentTarget.innerText) {
        case "Alpha":
            islands = [
                { "row": 1, "col": 5 }, { "row": 2, "col": 1 }, { "row": 3, "col": 8 },
                { "row": 4, "col": 3 }, { "row": 5, "col": 1 }, { "row": 6, "col": 8 },
                { "row": 7, "col": 3 }, { "row": 7, "col": 5 },
            ]
            break;
        case "Bravo":
            islands = [
                { "row": 1, "col": 8 }, { "row": 2, "col": 1 }, { "row": 3, "col": 6 },
                { "row": 4, "col": 4 }, { "row": 6, "col": 6 }, { "row": 7, "col": 2 },
            ]
            break;
        case "Charlie":
            islands = [
                { "row": 2, "col": 3 }, { "row": 2, "col": 4 }, { "row": 2, "col": 5 },
                { "row": 6, "col": 1 }, { "row": 7, "col": 6 }, { "row": 8, "col": 6 },
                { "row": 8, "col": 7 },
            ]
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
    switch (e.currentTarget.innerText) {
        case "Alpha":
            islands = [
                { "row": 1, "col": 1 }, { "row": 1, "col": 2 }, { "row": 1, "col": 6 },
                { "row": 1, "col": 11 }, { "row": 2, "col": 1 }, { "row": 2, "col": 8 },
                { "row": 2, "col": 11 }, { "row": 3, "col": 8 }, { "row": 5, "col": 4 },
                { "row": 5, "col": 14 }, { "row": 6, "col": 2 }, { "row": 6, "col": 11 },
                { "row": 7, "col": 1 }, { "row": 7, "col": 6 }, { "row": 7, "col": 7 },
                { "row": 7, "col": 8 }, { "row": 7, "col": 11 }, { "row": 8, "col": 3 },
                { "row": 8, "col": 12 }, { "row": 9, "col": 4 }, { "row": 10, "col": 1 },
                { "row": 10, "col": 7 }, { "row": 10, "col": 10 }, { "row": 11, "col": 1 },
                { "row": 11, "col": 3 }, { "row": 11, "col": 13 }, { "row": 12, "col": 3 },
                { "row": 12, "col": 6 }, { "row": 13, "col": 3 }, { "row": 13, "col": 7 },
                { "row": 13, "col": 13 },
            ]
            break;
        case "Bravo":
            islands = [
                { "row": 2, "col": 1 }, { "row": 2, "col": 2 }, { "row": 3, "col": 6 },
                { "row": 3, "col": 10 }, { "row": 3, "col": 11 }, { "row": 3, "col": 12 },
                { "row": 4, "col": 6 }, { "row": 5, "col": 10 }, { "row": 6, "col": 10 },
                { "row": 7, "col": 2 }, { "row": 7, "col": 3 }, { "row": 7, "col": 5 },
                { "row": 8, "col": 5 }, { "row": 9, "col": 5 }, { "row": 10, "col": 10 },
                { "row": 12, "col": 2 }, { "row": 13, "col": 1 }, { "row": 13, "col": 13 },
            ]
            break;
        case "Charlie":
            islands = [
                { "row": 3, "col": 2 }, { "row": 3, "col": 6 }, { "row": 4, "col": 1 },
                { "row": 4, "col": 6 }, { "row": 4, "col": 7 }, { "row": 4, "col": 8 },
                { "row": 7, "col": 2 }, { "row": 7, "col": 5 }, { "row": 8, "col": 5 },
                { "row": 10, "col": 1 }, { "row": 11, "col": 2 },
            ]
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
        gridState[element.row][element.col] = "X";
    });
    removeElements.forEach(element => {
        gridState[element.row][element.col] = "";
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
                addElements.push({ "row": row - 1, "col": col });
            }
        }
        if (row <= gridSize - 2) {
            if (gridState[row + 1][col] === "" || gridState[row + 1][col] === "island") {
                if (gridState[row][col] != "island") {
                    removeElements.push({ "row": row, "col": col });
                }
            }
        }
        if (row === gridSize - 1) {
            removeElements.push({ "row": row, "col": col });
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
                addElements.push({ "row": row, "col": col + 1 });
            }
        }
        if (col >= 1) {
            if (gridState[row][col - 1] === "" || gridState[row][col - 1] === "island") {
                if (gridState[row][col] != "island") {
                    removeElements.push({ "row": row, "col": col });
                }
            }
        }
        if (col === 0) {
            removeElements.push({ "row": row, "col": col });
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
                addElements.push({ "row": row + 1, "col": col });
            }
        }
        if (row >= 1) {
            if (gridState[row - 1][col] === "" || gridState[row - 1][col] === "island") {
                if (gridState[row][col] != "island") {
                    removeElements.push({ "row": row, "col": col });
                }
            }
        }
        if (row === 0) {
            removeElements.push({ "row": row, "col": col });
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
                addElements.push({ "row": row, "col": col - 1 });
            }
        }
        if (col <= gridSize - 2) {
            if (gridState[row][col + 1] === "" || gridState[row][col + 1] === "island") {
                if (gridState[row][col] != "island") {
                    removeElements.push({ "row": row, "col": col });
                }
            }
        }
        if (col === gridSize - 1) {
            removeElements.push({ "row": row, "col": col });
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

function cellButtonHandler(e) {
    let addElements = [];
    let removeElements = [];

    console.log("inner text: ", e.currentTarget.innerText)

    if (e.currentTarget.innerText === "X") {
        removeElements.push({ "row": e.currentTarget.dataset.row, "col": e.currentTarget.dataset.col });
    }
    else if (e.currentTarget.innerText === "") {
        addElements.push({ "row": e.currentTarget.dataset.row, "col": e.currentTarget.dataset.col })
    }

    console.log("add elements: ", addElements);
    console.log("remove elements: ", removeElements);

    updateGridState(addElements, removeElements);
}

/** @type {HTMLDivElement | null} */
const board = document.querySelector("#board");

/** @type {HTMLDivElement | null} */
const grid = document.querySelector("#grid");

/** @type {HTMLDivElement | null} */
const arrowKeys = document.querySelector("#arrowKeys");

/** @type {NodeListOf<HTMLButtonElement>} */
const tbtButtons = document.querySelectorAll(".tbtButton");
tbtButtons.forEach(button => { button.addEventListener("click", tbtButtonHandler) })

/** @type {NodeListOf<HTMLButtonElement>} */
const rtButtons = document.querySelectorAll(".rtButton");
rtButtons.forEach(button => { button.addEventListener("click", rtButtonHandler) })
