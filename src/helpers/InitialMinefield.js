import { TILE_STATE, TILE_TYPE } from "./values"

// TODO: Generate tables according to difficulty
function generateSafeMinefield(){
    var minefield = []
    for (let i = 0; i < 9; i++){
        var newRow = []
        for (let j = 0; j < 9; j++){
            newRow = [...newRow, {type: TILE_TYPE.Safe, state: TILE_STATE.Hidden}];
        }
        minefield = [...minefield, newRow];
    }
    return minefield;
}

export default function generateInitialMinefield(){
    var minefield = generateSafeMinefield();
    
    var minesLeft = 10; // TODO: Make this relate to table size/difficulty
    while (minesLeft > 0){
        var rowIndex = Math.floor(Math.random() * minefield.length);
        var columnIndex = Math.floor(Math.random() * minefield[0].length);

        if (minefield[rowIndex][columnIndex].type === TILE_TYPE.Safe){
            minefield[rowIndex][columnIndex] = {type: TILE_TYPE.Mine, state: TILE_STATE.Hidden};
            minesLeft -= 1;
        }
    }

    return minefield;
}