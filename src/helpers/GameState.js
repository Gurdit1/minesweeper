import { TILE_STATE, TILE_TYPE } from "../helpers/values";

export const GAME_STATE = {
  Playing: 0,
  Won: 1,
  Lost: 2,
};

export function getGameState(minefield) {
  let state = GAME_STATE.Won;
  for (let row of minefield) {
    for (let tile of row) {
      if (tile.state === TILE_STATE.Revealed && tile.type === TILE_TYPE.Mine) {
        return GAME_STATE.Lost;
      }
      if (tile.state !== TILE_STATE.Revealed && tile.type === TILE_TYPE.Safe) {
        state = GAME_STATE.Playing;
      }
    }
  }
  return state;
}
