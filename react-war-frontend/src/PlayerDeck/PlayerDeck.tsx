import { useState } from "react";


function PlayerDeck({startingDeck}: {startingDeck: number[]}) {

    const [cards, setCards] = useState<number[]>(startingDeck);

    return (
        <div className="playerDeck">
            <h3>{cards.length}</h3>
        </div>
    );
}

export default PlayerDeck;