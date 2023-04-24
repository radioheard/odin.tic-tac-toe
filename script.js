const gameBoard = (() => {

    const space1 = 'x';
    const space2 = 'x';
    const space3 = 'x';
    const space4 = 'o';
    const space5 = 'o';
    const space6 = 'x';
    const space7 = 'o';
    const space8 = 'x';
    const space9 = 'o';

    return {
        space1,
        space2,
        space3,
        space4,
        space5,
        space6,
        space7,
        space8,
        space9,
    };
})();

const playerFactory = (name, ficha) => {
    return {name, ficha};
};