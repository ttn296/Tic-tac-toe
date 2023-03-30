const gameboard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const startCells = [
    "", "", "", "", "", "", "", "", ""
]

// create the board
function createBoard(){
startCells.forEach((cell, index) =>{
    const cellElement = document.createElement('div')
    cellElement.classList.add('square')
    gameboard.append(cellElement);
})
}
createBoard();
