import React, { useContext } from "react";
import Tile from "./Tile.js";
import { MovesContext } from "../store/MovesContext.js";

export default function Minefield() {
  const { getMinefield } = useContext(MovesContext);
  const minefield = getMinefield();

  return (
    <ol id="game-board">
      {minefield.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((tile, columnIndex) => (
              <li key={columnIndex}>
                <Tile
                  tile={tile}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                />
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
