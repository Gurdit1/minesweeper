export default function ScoreBoard( { maxFlags } ){
    return (
        <div>
            Flags left: { maxFlags }
            <br></br>
            <button>Restart</button>
        </div>
    )
}