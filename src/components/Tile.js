import { TILE_TYPE, TILE_STATE } from "../helpers/values";

const revealedColour = "gray";

function getTextColour(tile){
    if (tile.state === TILE_STATE.Hidden){
        return "blue";
    }
    else if (tile.state === TILE_STATE.Flagged){
        return "red";
    }
    else if (tile.state === TILE_STATE.Question){
        return "pink";
    }
    else if (tile.state === TILE_STATE.Revealed){
        if (tile.type === TILE_TYPE.Safe){
            return "black";
        }
        return "black";
    }
}

function getTileColour(tile) {
    if (tile.state === TILE_STATE.Hidden){
        return "blue";
    }
    else if (tile.state === TILE_STATE.Flagged){
        return "red";
    }
    else if (tile.state === TILE_STATE.Question){
        return "pink";
    }
    else if (tile.state === TILE_STATE.Revealed){
        if (tile.type === TILE_TYPE.Safe){
            return revealedColour;
        }
        return "black";
    }
}

function isInRange(value, min, max){
    return value >= min && value < max;
}

function calculateNumNearbyMines(tile, rowIndex, columnIndex, minefield){
    if (tile.state !== TILE_STATE.Revealed){
        return undefined;
    }

    let count = 0;
    for (let i = -1; i <= 1; i++){
        if (!isInRange(rowIndex + i, 0, minefield.length)) continue;
        for (let j = -1; j <= 1; j++){
            if (i === 0 && j === 0) continue; // Ignore self
            if (!isInRange(columnIndex + j, 0, minefield[0].length)) continue;
            if (minefield[rowIndex + i][columnIndex + j].type === TILE_TYPE.Mine){
                count+=1;
            }
        }
    }
    return count;
}

export default function Tile({ tile, rowIndex, columnIndex, onSelectTile, minefield}) {
    const emptyText = "N"; // Fallback text since empty text results in button being re-sized
    const numMines = calculateNumNearbyMines(tile, rowIndex, columnIndex, minefield);

    let textColour = getTextColour(tile);
    if (numMines === 0 && tile.state === TILE_STATE.Revealed && tile.type === TILE_TYPE.Safe){
        textColour = revealedColour; // Hide text
    }

    return <li key={columnIndex}>
        <button style={{width: "4rem", height: "4rem", backgroundColor: getTileColour(tile), color: textColour}}
            onClick={() => onSelectTile(rowIndex, columnIndex)}
        >
            {numMines ? (numMines === 0 ? emptyText : String(numMines)) : emptyText}
        </button>
    </li>
}