import { GAME_STATE, getGameState } from "../helpers/GameState.js";
import { TILE_STATE } from "../helpers/values.js";
import { MovesContext } from "../store/MovesContext.js";
import React, { useContext } from "react";

function getGameStateText(minefield) {
  const gameState = getGameState(minefield);
  if (gameState === GAME_STATE.Playing) {
    return "Game in progress";
  }
  if (gameState === GAME_STATE.Won) {
    return "You won!";
  }
  return "You lost!";
}

function countFlags(minefield) {
  let count = 0;
  minefield.forEach((row) => {
    row.forEach((tile) => {
      if (tile.state === TILE_STATE.Flagged) {
        count++;
      }
    });
  });
  return count;
}

export default function ScoreBoard({ maxFlags }) {
  const { getMinefield, restart } = useContext(MovesContext);
  const minefield = getMinefield();

  return (
    <div>
      Flags left: {maxFlags - countFlags(minefield)}
      <br />
      {getGameStateText(minefield)}
      <br />
      <button onClick={restart}>Restart</button>
    </div>
  );
}
