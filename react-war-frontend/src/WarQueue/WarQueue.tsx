import type { Card } from "../gameplay/Card";


function WarQueue({warDeque} : {warDeque: Card[]}) {

    const displayCard = (card: Card) => card.isFaceUp ? card.value : '|';

    return (
        <>
            <h4 id="player1Card">{warDeque.length > 0 ? displayCard(warDeque[0]) : 'X'}</h4>
            <h4 id="player2Card">{warDeque.length > 0 ? displayCard(warDeque[warDeque.length - 1]) : 'X'}</h4>
        </>
    );
}

export default WarQueue;