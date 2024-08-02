import { calculateNumAdjacentMines } from "../helpers/AdjacentTiles.js";
import { TILE_TYPE, TILE_STATE } from "../helpers/values";
import { MovesContext } from "../store/MovesContext.js";
import { useContext } from "react";

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

function getNumNearbyMines(tile, rowIndex, columnIndex, minefield){
    if (tile.state !== TILE_STATE.Revealed){
        return undefined;
    }

    return calculateNumAdjacentMines(rowIndex, columnIndex, minefield);
}

export default function Tile({ tile, rowIndex, columnIndex }) {
    const { getMinefield, leftClickTile, rightClickTile } = useContext(MovesContext)
    const minefield = getMinefield();

    const emptyText = "N"; // Fallback text since empty text results in button being re-sized
    const numMines = getNumNearbyMines(tile, rowIndex, columnIndex, minefield);

    let textColour = getTextColour(tile);
    if (numMines === 0 && tile.state === TILE_STATE.Revealed && tile.type === TILE_TYPE.Safe){
        textColour = revealedColour; // Hide text
    }

    return <button style={{width: "4rem", height: "4rem", backgroundColor: getTileColour(tile), color: textColour}}
        onClick={() => leftClickTile(rowIndex, columnIndex)}
        onContextMenu={(e) => {
            e.preventDefault();
            rightClickTile(rowIndex, columnIndex)
        }}
    >
        {numMines ? (numMines === 0 ? emptyText : String(numMines)) : emptyText}
    </button>
}