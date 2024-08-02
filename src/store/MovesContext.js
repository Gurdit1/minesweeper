import { createContext, useState } from "react";
import { TILE_STATE, TILE_TYPE } from "../helpers/values";
import generateMinefield from "../helpers/GenerateMinefield"
import { GAME_STATE, getGameState } from "../helpers/GameState";
import { calculateNumAdjacentMines, getAdjacentTiles } from "../helpers/AdjacentTiles.js";

export const MovesContext = createContext();

function getAdjacentEmptyTiles(move, minefield){
  return getAdjacentTiles(move.rowIndex, move.columnIndex, minefield).
    filter((adjacentTile) =>
      calculateNumAdjacentMines(adjacentTile.rowIndex, adjacentTile.columnIndex, minefield)
        == 0);
}

function getAdjacentEmptyHiddenTiles(move, minefield){
  return getAdjacentEmptyTiles(move, minefield).filter((adjacentTile) => adjacentTile.tile.state === TILE_STATE.Hidden);
}

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

          const selectedTile = minefield[move.rowIndex][move.columnIndex];
          if (move.userState === TILE_STATE.Revealed && selectedTile.type === TILE_TYPE.Safe){
            if (calculateNumAdjacentMines(move.rowIndex, move.columnIndex, minefield) === 0){
              var outerTiles = [];
              var disoveredEmptyTiles = getAdjacentEmptyHiddenTiles(move, minefield);

              // Store selected tile if at least one adjacent tile is a non-empty safe tile
              if (disoveredEmptyTiles.length < 8){
                outerTiles = [{rowIndex: move.rowIndex, columnIndex: move.columnIndex, tile: selectedTile}]
              }

              while (disoveredEmptyTiles.length > 0){
                for (const disoveredEmptyTile of disoveredEmptyTiles){
                  minefield[disoveredEmptyTile.rowIndex][disoveredEmptyTile.columnIndex] = {...minefield[disoveredEmptyTile.rowIndex][disoveredEmptyTile.columnIndex], state: TILE_STATE.Revealed};
                }

                const revealedTiles = [...disoveredEmptyTiles];
                disoveredEmptyTiles = [];

                for (const revealedTile of revealedTiles){
                  const newDiscoveredEmptyTiles = getAdjacentEmptyHiddenTiles(revealedTile, minefield);;
                  disoveredEmptyTiles = [...disoveredEmptyTiles, ...newDiscoveredEmptyTiles];

                  if (newDiscoveredEmptyTiles.length < 8){
                    outerTiles = [...outerTiles, revealedTile]
                  }
                }
              }

              // Up to this point, only tiles with 0 adjacent mines are revealed so we must reveal all safe tiles that are adjacent to all border tiles
              for (const outerTile of outerTiles){
                const remainingTiles = getAdjacentTiles(outerTile.rowIndex, outerTile.columnIndex, minefield);
                for (const remainingTile of remainingTiles){
                  minefield[remainingTile.rowIndex][remainingTile.columnIndex] = {...minefield[remainingTile.rowIndex][remainingTile.columnIndex], state: TILE_STATE.Revealed};
                }
              }
            }
          }
        })
        return minefield;
    }

    function leftClickTile(rowIndex, columnIndex){
        var minefield = computeCurrentMinefieldState();
        if (getGameState(minefield) !== GAME_STATE.Playing) { return; }
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
        if (getGameState(minefield) !== GAME_STATE.Playing) { return; }
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