import { createContext, useState } from "react";
import { TILE_STATE } from "../helpers/values";
import generateInitialMinefield from "../helpers/InitialMinefield"

export const MovesContext = createContext();

export function MovesContextProvider({ children }){
    const [startingMinefield, setStartingMinefield] = useState(generateInitialMinefield())
    const [moves, setMoves] = useState([]) // Array of objects with fields: rowIndex, columnIndex, userState

    function computeCurrentMinefieldState(){
        var minefield = [...startingMinefield].map((array) => [...array]);
        moves.forEach((move) => {
          minefield[move.rowIndex][move.columnIndex] = {...minefield[move.rowIndex][move.columnIndex], state: move.userState};
        })
        return minefield;
    }
    
    function handleSelectTile(rowIndex, columnIndex){
        var minefield = computeCurrentMinefieldState();
        if (minefield[rowIndex][columnIndex].state === TILE_STATE.Revealed){
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

    const ctxValue = {
        getMinefield: computeCurrentMinefieldState,
        onSelectTile: handleSelectTile
    }

    return <MovesContext.Provider value={ctxValue}>{children}</MovesContext.Provider>
}