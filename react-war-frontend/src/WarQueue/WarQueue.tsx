import { CardValues, type Card } from "../gameplay/Card";


function WarQueue({warDeque} : {warDeque: Card[]}) {

    const player1Card = warDeque[0];
    const player2Card = warDeque[warDeque.length - 1];

    const displayCard = (card: Card) => {

        if (!card.isFaceUp) {
            return '';
        }

        if (card.value === CardValues.Jack) {
            return 'J';
        } else if (card.value === CardValues.Queen) {
            return 'Q';
        } else if (card.value === CardValues.King) {
            return 'K';
        } else if (card.value === CardValues.Ace) {
            return 'A';
        } else {
            return card.value;
        }
    }

    const getPlayerCardClass = (card: Card) => `playerCard ${card ? (card.isFaceUp ? 'faceUp' : 'faceDown') : ''}`;

    return (
        <>
            <div className={getPlayerCardClass(player1Card)}>
                <h4 className="cardText">{warDeque.length > 0 ? displayCard(player1Card) : ''}</h4>
            </div>
            <div className={getPlayerCardClass(player2Card)}>
                <h4 className="cardText">{warDeque.length > 0 ? displayCard(player2Card) : ''}</h4>
            </div>
        </>
    );
}

export default WarQueue;