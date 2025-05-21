import './App.css'
import './RevealButton/RevealButton';
import RevealButton from './RevealButton/RevealButton';
import PlayerDeck from './PlayerDeck/PlayerDeck';
import WarQueue from './WarQueue/WarQueue';
import { useState, useMemo } from 'react';

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

function dealShuffledDeck(shuffledDeck: number[]) : [number[], number[]] {

  let player1Deck : number[] = [];
  let player2Deck : number[] = [];
  shuffledDeck.forEach((card, i) => (i % 2 == 0 ? player1Deck : player2Deck).push(card));
  return [player1Deck, player2Deck];
}

// This function is to lessen the chances of the game stalling
// shuffles the given array of cards by mapping the cards to objects with a random number key
// the cards are then sorted based off their keys, before finally being mapped back to 
// their original card values.
function shuffleWarSpoils(warDeque: number[]): number[] {
  return warDeque
          .map(card => ({value: card, sort: Math.random()}))
          .sort((a, b) => a.sort - b.sort)
          .map(obj => obj.value);
}

function App() {

  const [dealtPlayer1Deck, dealtPlayer2Deck] = useMemo(() => dealShuffledDeck(generateShuffledDeck()), [])

  const [player1Deck, setPlayer1Deck] = useState<number[]>(dealtPlayer1Deck);
  const [player2Deck, setPlayer2Deck] = useState<number[]>(dealtPlayer2Deck);

  const [warDeque, setWarDeque] = useState<number[]>([]);
  const [player1IsWarCardFaceUp, setPlayer1IsWarCardFaceUp] = useState(true);
  const [player2IsWarCardFaceUp, setPlayer2IsWarCardFaceUp] = useState(true);

  const [isDrawingCard, setIsDrawingCard] = useState(false);

  const isGameEnd = (player1Deck: number[], player2Deck: number[], warDeque: number[]) => (player1Deck.length === 0 || player2Deck.length === 0) && warDeque.length === 0;

  const handleReveal = () => {

    if (isDrawingCard) return; // guard clause

    setIsDrawingCard(true);

    const player1DeckUpdated = [...player1Deck];
    const player2DeckUpdated = [...player2Deck];
    const warDequeUpdated = [...warDeque];

    if (isGameEnd(player1DeckUpdated, player2DeckUpdated, warDequeUpdated)) {
      // winner declared!
      setIsDrawingCard(false);
      return;
    }

    let player1TopCard = -1;
    let player2TopCard = -1;

    if (player1DeckUpdated.length > 0) {

      player1TopCard = player1DeckUpdated.shift()!;
      warDequeUpdated.unshift(player1TopCard);
      setPlayer1IsWarCardFaceUp(true);
    }

    if (player2DeckUpdated.length > 0) {

      player2TopCard = player2DeckUpdated.shift()!;
      warDequeUpdated.push(player2TopCard);
      setPlayer2IsWarCardFaceUp(true);
    }

    setPlayer1Deck([...player1DeckUpdated]);
    setPlayer2Deck([...player2DeckUpdated]);
    setWarDeque([...warDequeUpdated]);

    setTimeout(() => {

      if (player1TopCard !== player2TopCard) {

        (player1TopCard > player2TopCard ? player1DeckUpdated : player2DeckUpdated).push(...shuffleWarSpoils(warDequeUpdated));
        warDequeUpdated.splice(0, warDequeUpdated.length);

      } else {

        if (player1DeckUpdated.length > 0) {
          warDequeUpdated.unshift(player1DeckUpdated.shift()!);
          setPlayer1IsWarCardFaceUp(false);
        }

        if (player2DeckUpdated.length > 0) {
          warDequeUpdated.push(player2DeckUpdated.shift()!);
          setPlayer2IsWarCardFaceUp(false);
        }
      }

      setPlayer1Deck([...player1DeckUpdated]);
      setPlayer2Deck([...player2DeckUpdated]);
      setWarDeque([...warDequeUpdated]);
      
      setIsDrawingCard(false);

    }, 1000);
      
  };

  return (
    <>
      <h1>War!</h1>
      <div id="gameArea">
        <div>
          <PlayerDeck deck={player1Deck} />
          <RevealButton onReveal={handleReveal} disabled={isDrawingCard || isGameEnd(player1Deck, player2Deck, warDeque)} />
        </div>
      <WarQueue warDeque={warDeque} isPlayer1FaceUp={player1IsWarCardFaceUp} isPlayer2FaceUp={player2IsWarCardFaceUp} />
      <PlayerDeck deck={player2Deck} />
      </div>
    </>
  );
}

export default App;
