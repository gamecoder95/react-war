import type { Card } from "../gameplay/Card";

function PlayerDeck({deck}: {deck: Card[]}) {

    return (
        <div className="deck">
            <h3>{deck.length}</h3>
        </div>
    );
}

export default PlayerDeck;