const gameBoard = document.querySelector('#gameBoard');
const infoDisplay = document.querySelector('#info');
let myButton = document.querySelector('#myButton');
let myText = document.querySelector('#myText');
let output = document.querySelector('#output1');
let playAgainBtn = document.getElementById('playAgainBtn')

//Enter name
function myName(ev) {
    ev.preventDefault();
    output.innerText = myText.value;
}
myButton.addEventListener('click', myName);

const startCells = [
    "", "", "", "", "", "", "", "", ""
]

let current_player = "circle"
infoDisplay.textContent = "Circle goes first"
infoDisplay.style.fontWeight = 'bolder';

// create the board
function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement);
    })
}
createBoard();

//Add X or O to the empty board
function addGo(ev) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(current_player)
    ev.target.append(goDisplay)
    current_player = current_player === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "it is now  " + current_player + "'s turn."
    infoDisplay.style.fontWeight = 'bolder';
    ev.target.removeEventListener('click', addGo)
    checkWinner()
}

function checkWinner() {
    const allSquares = document.querySelectorAll('.square')
    const winningCombos = [
        //rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        //columns
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        //diagonals
        [1, 4, 8], [2, 4, 6]
    ]

    let draw = true;

    winningCombos.forEach(array => {
        const circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            infoDisplay.style.fontWeight = 'bolder';
            infoDisplay.style.color = 'blue';
            //cannot remove event listener, use cloneNode instead
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            draw = false;
            return
        }
    })
    winningCombos.forEach(array => {
        const crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'))

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            infoDisplay.style.fontWeight = 'bolder';
            infoDisplay.style.color = 'red';
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            draw = false;
            return
        }
    })
    if (draw) {
        checkDraw()
    }
};

function checkDraw() {
    const allSquares = document.querySelectorAll('.square');
    let isDraw = true;
    for (let i = 0; i < allSquares.length; i++) {
        if (!allSquares[i].firstChild) {
            isDraw = false
            break
        }
    }
    if (isDraw) {
        infoDisplay.textContent = "It's a draw!"
        infoDisplay.style.fontWeight = 'bolder';
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))

    }
}
playAgainBtn.addEventListener("click", function (ev) {
    location.reload()
    ev.preventDefault(ev);
});


