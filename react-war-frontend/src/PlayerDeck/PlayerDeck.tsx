import type { Card } from "../gameplay/Card";

function PlayerDeck({deck}: {deck: Card[]}) {

    return (
        <div className="deck">
            <h3 className="cardText">{deck.length}</h3>
        </div>
    );
}

export default PlayerDeck;