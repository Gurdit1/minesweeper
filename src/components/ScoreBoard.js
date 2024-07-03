export default function ScoreBoard( { minesLeft } ){
    return (
        <div>
            Mines left: { minesLeft }
            <br></br>
            <button>Restart</button>
        </div>
    )
}