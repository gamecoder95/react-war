import type { Card } from "../gameplay/Card";


function WarQueue({warDeque} : {warDeque: Card[]}) {

    const displayCard = (card: Card) => card.isFaceUp ? card.value : '|';

    return (
        <>
            <div className="playerCard">
                <h4>{warDeque.length > 0 ? displayCard(warDeque[0]) : 'X'}</h4>
            </div>
            <div className="playerCard">
                <h4>{warDeque.length > 0 ? displayCard(warDeque[warDeque.length - 1]) : 'X'}</h4>
            </div>
        </>
    );
}

export default WarQueue;