import { TILE_TYPE } from "./values";

function isInRange(value, min, max) {
  return value >= min && value < max;
}

export function getAdjacentTiles(rowIndex, columnIndex, minefield) {
  var adjacentTiles = [];
  for (let i = -1; i <= 1; i++) {
    if (!isInRange(rowIndex + i, 0, minefield.length)) continue;
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Ignore self
      if (!isInRange(columnIndex + j, 0, minefield[0].length)) continue;
      adjacentTiles = [
        ...adjacentTiles,
        {
          rowIndex: rowIndex + i,
          columnIndex: columnIndex + j,
          tile: minefield[rowIndex + i][columnIndex + j],
        },
      ];
    }
  }
  return adjacentTiles;
}

export function calculateNumAdjacentMines(rowIndex, columnIndex, minefield) {
  const adjacentTiles = getAdjacentTiles(rowIndex, columnIndex, minefield);

  let count = 0;
  for (const adjacentTile of adjacentTiles) {
    if (adjacentTile.tile.type === TILE_TYPE.Mine) {
      count += 1;
    }
  }

  return count;
}
