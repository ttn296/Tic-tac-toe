const gameBoard = document.querySelector('#gameBoard');
const infoDisplay = document.querySelector('#info');
let myButton = document.getElementById('myButton');
let myText = document.getElementById('myText');
let output = document.getElementById('output1');
let playAgainBtn = document.getElementById('playAgainBtn')
let rnd = Math.floor(Math.random());
let player1 = 0;
let player2 = 0;

const startCells = [
    "", "", "", "", "", "", "", "", ""
]

//Enter name
function myName() {
    output.innerText = myText.value;
}
myButton.addEventListener('click', myName);

let current_player = "circle"
infoDisplay.textContent = "Circle goes first"

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

    winningCombos.forEach(array => {
        const circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            //cannot remove event listener, use cloneNode instead
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
        score();
    })
    winningCombos.forEach(array => {
        const crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'))

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return

        }
    })

    playAgainBtn.addEventListener("click", function () {
        location.reload()
    })

    function score() {
        rnd.score++;
        // document.querySelector('#player1').infoDisplay = player1;
        // document.querySelector('#player2').infoDisplay = player2;
    }
};

