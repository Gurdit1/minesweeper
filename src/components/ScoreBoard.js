export default function ScoreBoard( { maxFlags } ){
    return (
        <div>
            Flags left: { maxFlags }
            <br/>
            Game in progress
            <br/>
            <button>Restart</button>
        </div>
    )
}