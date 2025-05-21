import './App.css'
import './RevealButton/RevealButton';
import RevealButton from './RevealButton/RevealButton';
import PlayerDeck from './PlayerDeck/PlayerDeck';
import WarQueue from './WarQueue/WarQueue';
import { useState, useMemo } from 'react';
import { dealShuffledDeck, generateShuffledDeck, shuffleWarSpoils } from './gameplay/GameplayHelperFunctions';
import type { Card } from './gameplay/Card';


function App() {

  const [dealtPlayer1Deck, dealtPlayer2Deck] = useMemo(() => dealShuffledDeck(generateShuffledDeck()), [])

  const [player1Deck, setPlayer1Deck] = useState<Card[]>(dealtPlayer1Deck);
  const [player2Deck, setPlayer2Deck] = useState<Card[]>(dealtPlayer2Deck);

  const [warDeque, setWarDeque] = useState<Card[]>([]);

  const [isDrawingCard, setIsDrawingCard] = useState(false);

  const isGameEnd = (player1Deck: Card[], player2Deck: Card[], warDeque: Card[]) => (player1Deck.length === 0 || player2Deck.length === 0) && warDeque.length === 0;

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

    let player1TopCard: Card | null = null;
    let player2TopCard: Card | null = null;

    if (player1DeckUpdated.length > 0) {

      player1TopCard = player1DeckUpdated.shift()!;
      player1TopCard.isFaceUp = true;
      warDequeUpdated.unshift(player1TopCard);
    }

    if (player2DeckUpdated.length > 0) {

      player2TopCard = player2DeckUpdated.shift()!;
      player2TopCard.isFaceUp = true;
      warDequeUpdated.push(player2TopCard);
    }

    setPlayer1Deck([...player1DeckUpdated]);
    setPlayer2Deck([...player2DeckUpdated]);
    setWarDeque([...warDequeUpdated]);

    setTimeout(() => {

      if (player1TopCard && player2TopCard && player1TopCard.value !== player2TopCard.value) {

        (player1TopCard.value > player2TopCard.value ? player1DeckUpdated : player2DeckUpdated).push(...shuffleWarSpoils(warDequeUpdated));
        warDequeUpdated.splice(0, warDequeUpdated.length);

      } else {

        if (player1DeckUpdated.length > 0) {
          player1TopCard = player1DeckUpdated.shift()!;
          player1TopCard.isFaceUp = false;
          warDequeUpdated.unshift(player1TopCard);
        }

        if (player2DeckUpdated.length > 0) {
          player2TopCard = player2DeckUpdated.shift()!;
          player2TopCard.isFaceUp = false;
          warDequeUpdated.push(player2TopCard);
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
      <WarQueue warDeque={warDeque} />
      <PlayerDeck deck={player2Deck} />
      </div>
    </>
  );
}

export default App;
