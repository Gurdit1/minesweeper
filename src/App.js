import ScoreBoard from './components/ScoreBoard';
import './App.css';
import { useState } from "react"
import generateInitialMinefield from './helpers/InitialMinefield.js';
import Minefield from './components/Minefield.js';
import { TILE_STATE } from './helpers/values.js';

function App() {
  const [moves, setMoves] = useState([]) //move is an object of fields: rowIndex, columnIndex, userState
  const [startingMinefield, setStartingMinefield] = useState(generateInitialMinefield())

  function computeCurrentMinefieldState(){
    var minefield = [...startingMinefield].map((array) => [...array]);
    moves.forEach((move) => {
      minefield[move.rowIndex][move.columnIndex] = {...minefield[move.rowIndex][move.columnIndex], state: move.userState};
    })
    return minefield;
  }

  // TODO: Detect game end if there is at least one tile of type MINE with state REVEALED

  function handleSelectTile(rowIndex, columnIndex){
    var minefield = computeCurrentMinefieldState();
    if (minefield[rowIndex][columnIndex].state === TILE_STATE.Revealed){
      return;
      //
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

  return (
    <div className="App">
      <ScoreBoard minesLeft={10}/>
      <Minefield minefield={computeCurrentMinefieldState()} onSelectTile={handleSelectTile}/>
    </div>
  );
}

export default App;
