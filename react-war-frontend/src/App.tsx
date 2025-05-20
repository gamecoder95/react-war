import './App.css'
import './RevealButton/RevealButton';
import RevealButton from './RevealButton/RevealButton';
import PlayerDeck from './PlayerDeck/PlayerDeck';
import WarQueue from './WarQueue/WarQueue';

function App() {

  return (
    <>
     <h2>War!</h2>
     <PlayerDeck />
     <RevealButton />
     <WarQueue />
     <PlayerDeck />
    </>
  )
}

export default App;
