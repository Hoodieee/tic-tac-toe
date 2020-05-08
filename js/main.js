 
// Define required constants
const colorsLookup = {
    '1': 'red', // player X
    '-1': 'blue', // player O
    'null': 'transparent' 
  };
// Variables
let board;
let turn;
let winner;
let player;

// Cached values
const boardEls = Array.from(document.querySelectorAll('#board > div'));
const messageEl = document.getElementById('message'); //get element to display message
const bodyEl = document.querySelector('body');
const backgroundEl = document.getElementById('background');


// Event Listeners
document.getElementById('board').addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', resetBoard);
document.getElementById('board').addEventListener('mouseover', mouseOver); // show player X or O on hover
document.getElementById('board').addEventListener('mouseout', mouseOut);   // change back to transparent background



// 	Initialize the state variables
init();
function init() {
    board =[
        [null, null, null,  // row 0 (col 0,1,2)
        null, null, null,   // row 1 (col 0,1,2)
        null, null, null]   // row 2 (col 0,1,2)
        ];

    turn = 1;
    winner = null;
    player = 'X';
    render();
}
    
function render() { //renders messages depending on status
    getBackground();
    renderBoard();
   if (winner) {
       if(winner === 'T') {
           messageEl.innerHTML = 'It is a tie!';
       } else {
           messageEl.innerHTML = `Congratulations <span style="color: ${colorsLookup[winner]}"> ${colorsLookup[winner].toUpperCase()} Player ${player}</span>! You have won!`;
       }
    }else {
        messageEl.innerHTML = `<span style="color: ${colorsLookup[turn]}">${colorsLookup[turn].toUpperCase()} Player ${player}</span>'s turn`;
    }
      
}


// Render those values to page
function renderBoard() {
    //Render the tic tac toe board
    board.forEach(function(box, boxId) {
        const div = document.getElementById(`box${boxId}`); 
        if (board[boxId] == 1) {
            div.innerText = 'X';
        } else if (board[boxId] == -1) {
            div.innerText = 'O';
        }

    });
}

// Handle a player clicking a square

function handleClick(evt){
    const boxId = boardEls.indexOf(evt.target); // index location of box clicked and storing it in boxId variable
    if (board[boxId] === 1 || board[boxId] === -1 || winner) {
        return;
    }else {
        board[boxId] = turn;
        getWinner();
        turn *= -1;
        if (winner) turn = winner;
        getPlayer();
        render();
    }   
}

// Handle a player clicking the replay button
function resetBoard() {
    board.forEach(function(box, boxId) {
        const div = document.getElementById(`box${boxId}`); 
        div.style.backgroundColor= "";
        div.innerText = "";
        board[boxId] = null;
    });
    turn = 1;
    winner = null;
    renderBoard();
    getBackground();
    init();
    
    
}

// find winner function
function getWinner() {
     checkDown();
     checkRight();
     checkDiagonalRight();
     checkDiagonalLeft();
     checkTie(); 
     
}

function checkDown() {    //checks each column to see if there is a winner
    for(let idx = 0; idx <= 3; idx++){
        if (Math.abs(board[idx] + board[idx + 3] + board[idx + 6]) === 3) {
        winner = turn;
        }
    }
}

function checkRight() {  //checks each row to see if there is a winner
    for (let idx = 0; idx <=6; idx += 3){
        if (Math.abs(board[idx] + board[idx + 1] + board[idx + 2]) === 3) {
        winner = turn;
        }
    }
}

function checkDiagonalLeft() { //check for winnner diagonal top left to bottom right
    let idx = 0; 
    if(Math.abs(board[idx] + board[idx + 4] + board[idx + 8]) === 3) {
        winner = turn;
    }
}

function checkDiagonalRight() { //check for winner diagonal top right to bottom left
    let idx = 2; 
    if(Math.abs(board[idx] + board[idx + 2] + board[idx + 4]) === 3) {
        winner = turn;

    }
}

function checkTie() {  // check for tie by setting starting value of total squares using gridValue. Subtract 1 when value present
    let gridValue = 9;
    board.forEach(function (el) {
        if (board[el] !== null && !winner) {
            gridValue -= 1;
        }             
    });
    if (gridValue === 0  && !winner) winner = 'T';
}

function getPlayer() {
    if (turn === 1) {
        player = 'X';
    }
    else if (turn === -1) {
        player = 'O';
    }

}

function mouseOver(evt) { //shows player X or O on hover
    const boxId = boardEls.indexOf(evt.target); // index location of box clicked and storing it in boxId variable
    if (board[boxId] === 1 || board[boxId] === -1 || winner) {
        return;
    }else {
        const div = document.getElementById(`box${boxId}`); 
        div.innerText = player;
        div.style.color = colorsLookup[turn];
    }


}

function mouseOut(evt) { // goes back to original board
    const boxId = boardEls.indexOf(evt.target); // index location of box clicked and storing it in boxId variable
    if (board[boxId] === 1 || board[boxId] === -1 || winner) {
        return;
    }else {
        const div = document.getElementById(`box${boxId}`); 
        div.innerText = "";
        div.style.color = "";
    }


}

function getBackground() {
    if(winner == 1){
        backgroundEl.style.backgroundImage = "url('https://i.imgur.com/CD5PkFw.jpg')";
    } else if(winner == -1){
        backgroundEl.style.backgroundImage = "url('https://i.imgur.com/vqzlruh.jpg')";
    } else {
        backgroundEl.style.backgroundImage = "url('https://i.imgur.com/IkA1ug7.jpg')";
        
    }
}
