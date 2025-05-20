import './App.css'
import './RevealButton/RevealButton';
import RevealButton from './RevealButton/RevealButton';
import PlayerDeck from './PlayerDeck/PlayerDeck';
import WarQueue from './WarQueue/WarQueue';

// temporary deck initialization logic
// TODO: put into game state logic code
function generateShuffledDeck() : number[] {

  // Cards: 2 - 10 are the numbers; 11, 12, and 13 are Jack, Queen, and King, respectively; 100 is the Ace, as Ace is high in War

  const deckOfCards = [];
  for(let i = 2; i <= 14; ++i) {

      let cardToAdd = i !== 14 ? i : 100;

      deckOfCards.push(cardToAdd);
      deckOfCards.push(cardToAdd);
      deckOfCards.push(cardToAdd);
      deckOfCards.push(cardToAdd);
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

function App() {

  const shuffledDeck = generateShuffledDeck();

  return (
    <>
      <h1>War!</h1>
      <div id="gameArea">
        <div>
          <PlayerDeck startingDeck={shuffledDeck.slice(0, Math.floor(shuffledDeck.length / 2))} />
          <RevealButton />
        </div>
      <WarQueue />
      <PlayerDeck startingDeck={shuffledDeck.slice(Math.floor(shuffledDeck.length / 2))} />
      </div>
    </>
  );
}

export default App;
