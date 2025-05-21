import './App.css'
import './RevealButton/RevealButton';
import RevealButton from './RevealButton/RevealButton';
import PlayerDeck from './PlayerDeck/PlayerDeck';
import WarQueue from './WarQueue/WarQueue';
import { useState, useMemo } from 'react';
import { dealDeckToTwoPlayers, generateShuffledDeck } from './gameplay/GameplayCardFunctions';
import type { Card } from './gameplay/Card';
import type { WarDeque } from './gameplay/WarDeque';
import { handleWar, isGameEnd, playCards } from './gameplay/GameplayFunctions';


function App() {

  const [dealtPlayer1Deck, dealtPlayer2Deck] = useMemo(() => dealDeckToTwoPlayers(generateShuffledDeck()), [])

  const [player1Deck, setPlayer1Deck] = useState<Card[]>(dealtPlayer1Deck);
  const [player2Deck, setPlayer2Deck] = useState<Card[]>(dealtPlayer2Deck);

  const [warDeque, setWarDeque] = useState<WarDeque>({deque: [], player1Length: 0, player2Length: 0});

  const [isRevealButtonDisabled, setIsRevealButtonDisabled] = useState(false);
  const [winner, setWinner] = useState(0);

  const updateUIState = (player1Deck: Card[], player2Deck: Card[], warDeque: WarDeque) => {
    setPlayer1Deck([...player1Deck]);
    setPlayer2Deck([...player2Deck]);
    setWarDeque({...warDeque});
  }

  const handleReveal = () => {

    if (isRevealButtonDisabled) return; // guard clause

    setIsRevealButtonDisabled(true);

    const player1DeckUpdated = [...player1Deck];
    const player2DeckUpdated = [...player2Deck];
    const warDequeUpdated = {...warDeque};

    playCards(player1DeckUpdated, player2DeckUpdated, warDequeUpdated);
    updateUIState(player1DeckUpdated, player2DeckUpdated, warDequeUpdated)

    setTimeout(() => {

      handleWar(player1DeckUpdated, player2DeckUpdated, warDequeUpdated);
      updateUIState(player1DeckUpdated, player2DeckUpdated, warDequeUpdated);
      
      if (isGameEnd(player1DeckUpdated, player2DeckUpdated, warDequeUpdated)) {
        setWinner(player1DeckUpdated.length > 0 ? 1 : 2);
      } else {
        setIsRevealButtonDisabled(false);
      }

    }, 1000);
  };

  return (
    <div id="app">
      <h1>War!</h1>
      {
        winner > 0 ? <h2>{`Player ${winner} wins!`}</h2> : <></>
      }
      <div id="gameArea">
      <PlayerDeck deck={player1Deck} />
      <WarQueue warDeque={warDeque.deque} />
      <PlayerDeck deck={player2Deck} />
      <RevealButton onReveal={handleReveal} disabled={isRevealButtonDisabled} />
      </div>
    </div>
  );
}

export default App;

