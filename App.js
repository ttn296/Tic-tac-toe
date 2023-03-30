const gameBoard = document.querySelector('#gameBoard');
const infoDisplay = document.querySelector('#info');
const startCells = [
    "", "", "", "", "", "", "", "", ""
]

let current_player = "circle"
infoDisplay.textContent = "Circle goes first"

// create the board
function createBoard(){
startCells.forEach((_cell, index) =>{
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
    goDisplay.classList.add('cross')
    ev.target.append(goDisplay)

}
