import { useState } from "react";


function PlayerDeck({startingDeck}: {startingDeck: number[]}) {

    const [cards, setCards] = useState<number[]>(startingDeck);

    return (
        <div className="playerDeck">
            <h4>{cards.length}</h4>
            <h3>/Deck/</h3>
        </div>
    );
}

export default PlayerDeck;