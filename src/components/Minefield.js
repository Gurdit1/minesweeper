import { TILE_TYPE, TILE_STATE } from "../helpers/values";

function displayTile(tile){
    if (tile.state === TILE_STATE.Hidden){
        return "H";
    }
    else if (tile.state === TILE_STATE.Flagged){
        return "F";
    }
    else if (tile.state === TILE_STATE.Question){
        return "?";
    }
    else if (tile.state === TILE_STATE.Revealed){
        if (tile.type === TILE_TYPE.Safe){
            //TODO: Compute number of adjacent tiles
            return " ";
        }
        return "M";
    }
}

export default function Minefield({ minefield, onSelectTile }){
    return (
        <ol>
            {minefield.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((tile, columnIndex) => (
                            <li key={columnIndex}>
                                <button
                                    onClick={() => onSelectTile(rowIndex, columnIndex)}
                                >
                                    {displayTile(tile)}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}