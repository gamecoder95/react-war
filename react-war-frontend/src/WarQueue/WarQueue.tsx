import type { Card } from "../gameplay/Card";


function WarQueue({warDeque} : {warDeque: Card[]}) {

    const player1Card = warDeque[0];
    const player2Card = warDeque[warDeque.length - 1];

    const displayCard = (card: Card) => card.isFaceUp ? card.value : '';

    const getPlayerCardClass = (card: Card) => `playerCard ${card ? (card.isFaceUp ? 'faceUp' : 'faceDown') : ''}`;

    return (
        <>
            <div className={getPlayerCardClass(player1Card)}>
                <h4>{warDeque.length > 0 ? displayCard(player1Card) : 'X'}</h4>
            </div>
            <div className={getPlayerCardClass(player2Card)}>
                <h4>{warDeque.length > 0 ? displayCard(player2Card) : 'X'}</h4>
            </div>
        </>
    );
}

export default WarQueue;