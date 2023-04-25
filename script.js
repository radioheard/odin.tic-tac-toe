const gameBoard = (() => {

    let board = ['x','x','x','o','o','x','o','x','o']

    return {
        board,
    };
})();

const playerFactory = (name, ficha) => {
    return {name, ficha};
};

function boardRender () {
    let board = document.getElementById('gameboard')
    gameBoard.board.forEach( function(mark, i) {
        let div = document.createElement('div');
        let content = document.createTextNode(mark);
        div.appendChild(content);
        div.className = 'spc';
        div.id = `${i}`;
        board.appendChild(div);
    });
}

boardRender();