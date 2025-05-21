import { CardValues, type Card } from "./Card";

function generateShuffledDeck() : Card[] {

  const deckOfCards: Card[] = [];

  for (const value of Object.values(CardValues)) {
    for (let i = 0; i < 4; ++i) {
      deckOfCards.push({
        value,
        isFaceUp: false
      });
    }
  }

  // shuffle cards in place (hence why I'm not using the "getCardsShuffled" function)
  for (let i = deckOfCards.length - 1; i > 0; --i) {
      // Generate random index between [0, i]
      const j = Math.floor(Math.random() * (i + 1));
      // swap elements at i and j
      [deckOfCards[i], deckOfCards[j]] = [deckOfCards[j], deckOfCards[i]];
  }

  return deckOfCards;
}

function dealShuffledDeck(shuffledDeck: Card[]) : [Card[], Card[]] {

  let player1Deck : Card[] = [];
  let player2Deck : Card[] = [];
  shuffledDeck.forEach((card, i) => (i % 2 == 0 ? player1Deck : player2Deck).push(card));
  return [player1Deck, player2Deck];
}

function getCardsShuffled(cards: Card[]): Card[] {
  return cards
          .map(card => ({value: card, sort: Math.random()}))
          .sort((a, b) => a.sort - b.sort)
          .map(obj => obj.value);
}

export { generateShuffledDeck, dealShuffledDeck, getCardsShuffled };