import { createContext, useState } from "react";
import { TILE_STATE } from "../helpers/values";
import generateMinefield from "../helpers/InitialMinefield"

export const MovesContext = createContext();

export function MovesContextProvider({ children }){
    const [startingMinefield, setStartingMinefield] = useState(generateMinefield())
    const [moves, setMoves] = useState([]) // Array of objects with fields: rowIndex, columnIndex, userState

    function restart(){
      setMoves([]);
      setStartingMinefield(generateMinefield());
    }

    function computeCurrentMinefieldState(){
        var minefield = [...startingMinefield].map((array) => [...array]);
        moves.forEach((move) => {
          minefield[move.rowIndex][move.columnIndex] = {...minefield[move.rowIndex][move.columnIndex], state: move.userState};
        })
        return minefield;
    }

    function leftClickTile(rowIndex, columnIndex){
        var minefield = computeCurrentMinefieldState();
        if (minefield[rowIndex][columnIndex].state !== TILE_STATE.Hidden){
          return;
        }
        setMoves((prevMoves) => {return [
          ...prevMoves,
          {
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            userState: TILE_STATE.Revealed
          }
        ]
        });
    }

    function rightClickTile(rowIndex, columnIndex){
        var minefield = computeCurrentMinefieldState();
        const selectedTile = minefield[rowIndex][columnIndex];

        let newState;
        if (selectedTile.state === TILE_STATE.Hidden){
            newState = TILE_STATE.Flagged;
        }
        else if (selectedTile.state === TILE_STATE.Flagged){
            newState = TILE_STATE.Hidden; // Only hidden tiles should be flagged
        }
        else { return; }

        setMoves((prevMoves) => {return [
            ...prevMoves,
            {
              rowIndex: rowIndex,
              columnIndex: columnIndex,
              userState: newState
            }
          ]
        });
    }

    const ctxValue = {
        getMinefield: computeCurrentMinefieldState,
        leftClickTile,
        rightClickTile,
        restart
    }

    return <MovesContext.Provider value={ctxValue}>{children}</MovesContext.Provider>
}