

function WarQueue({warDeque, isPlayer1FaceUp, isPlayer2FaceUp} : {warDeque: number[], isPlayer1FaceUp: boolean, isPlayer2FaceUp: boolean}) {
    return (
        <>
            <h4 id="player1Card">{warDeque.length > 0 ? (isPlayer1FaceUp ? warDeque[0] : '|') : 'X'}</h4>
            <h4 id="player2Card">{warDeque.length > 0 ? (isPlayer2FaceUp ? warDeque[warDeque.length - 1] : '|') : 'X'}</h4>
        </>
    );
}

export default WarQueue;