import { TILE_STATE } from "../helpers/values.js";
import { MovesContext } from "../store/MovesContext.js";
import { useContext } from "react";

function countFlags(minefield){
    let count = 0;
    minefield.forEach(row => {
        row.forEach(tile => {
            if (tile.state === TILE_STATE.Flagged){
                count++;
            }
        })
    });
    return count;
}

export default function ScoreBoard( { maxFlags } ){
    const { getMinefield, restart } = useContext(MovesContext)
    const minefield = getMinefield();

    return (
        <div>
            Flags left: { maxFlags - countFlags(minefield) }
            <br/>
            Game in progress
            <br/>
            <button onClick={restart}>Restart</button>
        </div>
    )
}