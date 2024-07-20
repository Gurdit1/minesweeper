import Tile from "./Tile.js"

export default function Minefield({ minefield, onSelectTile }){
    return (
        <ol id="game-board">
            {minefield.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((tile, columnIndex) => (
                            <li key={columnIndex}>
                                <Tile tile={tile} rowIndex={rowIndex} columnIndex={columnIndex} onSelectTile={onSelectTile} minefield={minefield}/>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}