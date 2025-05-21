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

  // shuffle cards
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

// This function is to lessen the chances of the game stalling
// shuffles the given array of cards by mapping the cards to objects with a random number key
// the cards are then sorted based off their keys, before finally being mapped back to 
// their original card values.
function shuffleWarSpoils(warDeque: Card[]): Card[] {
  return warDeque
          .map(card => ({value: card, sort: Math.random()}))
          .sort((a, b) => a.sort - b.sort)
          .map(obj => obj.value);
}

export { generateShuffledDeck, dealShuffledDeck, shuffleWarSpoils };