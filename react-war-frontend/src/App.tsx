import './App.css'
import './RevealButton/RevealButton';
import RevealButton from './RevealButton/RevealButton';
import PlayerDeck from './PlayerDeck/PlayerDeck';
import WarQueue from './WarQueue/WarQueue';
import { useState, useMemo } from 'react';
import { dealShuffledDeck, generateShuffledDeck } from './gameplay/GameplayHelperFunctions';
import type { Card } from './gameplay/Card';
import { handleWar, isGameEnd, playCards } from './gameplay/GameplayFunctions';


function App() {

  const [dealtPlayer1Deck, dealtPlayer2Deck] = useMemo(() => dealShuffledDeck(generateShuffledDeck()), [])

  const [player1Deck, setPlayer1Deck] = useState<Card[]>(dealtPlayer1Deck);
  const [player2Deck, setPlayer2Deck] = useState<Card[]>(dealtPlayer2Deck);

  const [warDeque, setWarDeque] = useState<Card[]>([]);

  const [isDrawingCard, setIsDrawingCard] = useState(false);

  const updateUIState = (player1Deck: Card[], player2Deck: Card[], warDeque: Card[]) => {
    setPlayer1Deck([...player1Deck]);
    setPlayer2Deck([...player2Deck]);
    setWarDeque([...warDeque]);
  }

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

    playCards(player1DeckUpdated, player2DeckUpdated, warDequeUpdated);
    updateUIState(player1DeckUpdated, player2DeckUpdated, warDequeUpdated)

    setTimeout(() => {

      handleWar(player1DeckUpdated, player2DeckUpdated, warDequeUpdated);
      updateUIState(player1DeckUpdated, player2DeckUpdated, warDequeUpdated);
      
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

