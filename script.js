const gameBoard = (() => {

    let board = ['','','','','','','','',''];

    const resetBoard = () => {
        gameBoard.board = ['','','','','','','','',''];
    }


    return {
        board, resetBoard
    };
})();


const winChecker = (() => {
    let playerOne = 'Player One';
    let playerTwo = 'Player Two';
    const winnerBox = document.querySelector('.box');
    const winnerDisplay = document.getElementById('winner');
    const isTaken = (cell) => cell != '';
    let winnerT = '';
    const winCheck = () => {
        if (gameBoard.board.every(isTaken) == true) {
            turnManager.screen.textContent = '';
            turnManager.screenT = document.createTextNode('Tie!');
            turnManager.screen.appendChild(turnManager.screenT);
            turnManager.reset.style['boxShadow'] = '0px 0px 18px 2px rgba(255,204,0,1)';

        } else if ((gameBoard.board[0] == gameBoard.board[1] && gameBoard.board[0] == gameBoard.board[2] && gameBoard.board[0] != '') ||
            (gameBoard.board[3] == gameBoard.board[4] && gameBoard.board[3] == gameBoard.board[5] && gameBoard.board[3] != '') ||
            (gameBoard.board[6] == gameBoard.board[7] && gameBoard.board[6] == gameBoard.board[8] && gameBoard.board[6] != '') ||
            (gameBoard.board[0] == gameBoard.board[3] && gameBoard.board[0] == gameBoard.board[6] && gameBoard.board[0] != '') ||
            (gameBoard.board[1] == gameBoard.board[4] && gameBoard.board[1] == gameBoard.board[7] && gameBoard.board[1] != '') ||
            (gameBoard.board[2] == gameBoard.board[5] && gameBoard.board[2] == gameBoard.board[8] && gameBoard.board[2] != '') ||
            (gameBoard.board[0] == gameBoard.board[4] && gameBoard.board[0] == gameBoard.board[8] && gameBoard.board[0] != '') ||
            (gameBoard.board[2] == gameBoard.board[4] && gameBoard.board[2] == gameBoard.board[6] && gameBoard.board[2] != '')) {
                if (turnManager.playerTurn == 1) {
                    turnManager.screen.textContent = '';
                    turnManager.screenT = document.createTextNode(`${winChecker.playerOne} (╯°□°)╯`);
                    turnManager.screen.appendChild(turnManager.screenT);
                    winnerT = document.createTextNode(`${winChecker.playerTwo} Wins!!`);
                    winnerDisplay.appendChild(winnerT);
                    winnerBox.style.visibility = 'visible'
                } else {
                    turnManager.screen.textContent = '';
                    turnManager.screenT = document.createTextNode(`${winChecker.playerTwo} (╯°□°)╯`);
                    turnManager.screen.appendChild(turnManager.screenT);
                    winnerT = document.createTextNode(`${winChecker.playerOne} Wins!!`);
                    winnerDisplay.appendChild(winnerT);
                    winnerBox.style.visibility = 'visible'
                }
            }
    }
    return {winCheck, playerOne, playerTwo, winnerBox}
})();

const playerManager = (() => {
    const addBtn = document.getElementById('add');
    const form = document.getElementById('form');
    const ok = document.getElementById('ok');
    const name = document.getElementById('name');
    const players = document.getElementById('players')
    const clear = document.getElementById('clear')
    addBtn.addEventListener('click', () => {
        if (winChecker.playerTwo != 'Player Two') {
            alert ('Only 2 players!')
            return
        } else {
        form.style.visibility = 'visible';
        name.focus();
        }
        name.value=''
    })
    ok.addEventListener('click', (event) => {
        event.preventDefault();
        if (name.value == '') {
            alert("Name can't be empty!")
        } else {
            let playerName = document.createElement('li');
            let playerT = document.createTextNode(`${name.value}`);
            playerName.appendChild(playerT);
            players.appendChild(playerName);
            form.style.visibility = 'hidden';
            if (winChecker.playerOne == 'Player One') {
                winChecker.playerOne = `${name.value}`;
                turnManager.screen.textContent = '';
                turnManager.screenT = document.createTextNode(`${winChecker.playerOne}'s Turn`);
                turnManager.screen.appendChild(turnManager.screenT);
            } else {
                winChecker.playerTwo = `${name.value}`;
        }
    }
    })
    clear.addEventListener('click', () => {
        if (confirm('This will reset the game. Is that cool?')) {
        players.textContent = '';
        winChecker.playerOne = 'Player One';
        winChecker.playerTwo = 'Player Two';
        turnManager.gameReset();
    }
        
    })
})();

const turnManager = (() => {

    const screen = document.getElementById('screen');
    let screenT = document.createTextNode(`${winChecker.playerOne}'s Turn`);
    screen.appendChild(screenT);
    let playerTurn = 1;
    const reset = document.getElementById('reset');
    const rematch = document.getElementById('rematch');
    const gameReset = () => {
        gameBoard.resetBoard();
        boardRender();
        turnManager.playerTurn = 2;
        turnManager.changeTurn();
        winChecker.winnerBox.style.visibility = 'hidden';
        let WinP = document.querySelector('span');
        WinP.textContent = '';
        turnManager.reset.style['boxShadow'] = '';
    }
    reset.addEventListener('click', gameReset);
    rematch.addEventListener('click', gameReset);
    const changeTurn = () => {
        if (turnManager.playerTurn == 1) {
            turnManager.playerTurn = 2;
            turnManager.screen.textContent = '';
            turnManager.screenT = document.createTextNode(`${winChecker.playerTwo}'s Turn`);
            turnManager.screen.appendChild(turnManager.screenT);
        } else {
            turnManager.playerTurn = 1;
            turnManager.screen.textContent = '';
            turnManager.screenT = document.createTextNode(`${winChecker.playerOne}'s Turn`);
            turnManager.screen.appendChild(turnManager.screenT);
        }
    };

    return { playerTurn, changeTurn, screen, screenT,reset, gameReset}
})();

function boardRender () {
    let board = document.getElementById('gameboard');
    board.textContent = '';
    gameBoard.board.forEach( function(mark, i) {
        let div = document.createElement('div');
        let content = document.createTextNode(mark);
        div.appendChild(content);
        div.className = 'spc';
        div.id = `${i}`;
        board.appendChild(div);
        div.addEventListener("click", function(e) {
            let index = e.target.id;
            if (gameBoard.board[index] == '') {
                board.textContent = '';
                if (turnManager.playerTurn == 1) { 
                gameBoard.board.splice(index, 1, 'x');
                } else {
                    gameBoard.board.splice(index, 1, 'o');
                }
                turnManager.changeTurn();
                boardRender();
                winChecker.winCheck();
            } else {
                alert('That spot is already taken!')
            }
        });        
    })
}



boardRender();