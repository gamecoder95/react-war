import { Card, CardValues } from "../src/gameplay/Card";

function getDummyDeck(): Card[] {
    return [{value: CardValues.Ace, isFaceUp: false}, 
            {value: CardValues.Three, isFaceUp: false}, 
            {value: CardValues.Two, isFaceUp: false}, 
            {value: CardValues.Jack, isFaceUp: false}, 
            {value: CardValues.Queen, isFaceUp: false}];
}

export { getDummyDeck };