import { useState } from 'react';
import './App.css';
import BoardGame from './components/BoardGame/BoardGame';
import { GAMES } from './mocks/games';
import SelectLevel from './components/SelectLevel/SelectLevel';

function App() {
  const [isWelcome, setWelcome] = useState(true);
  const [gameId, setGameId] = useState(0);

  const nextLevel = () => {
    setGameId((prev) => prev + 1);
  };

  const selectLevel = (level) => {
    setGameId(level - 1);
    setWelcome(false);
  };

  const openLevelsSelection = () => {
    setWelcome(true);
  };

  return (
    <div className="App">
      {isWelcome ? (
        <div className="select-level-container">
          <SelectLevel selectLevel={selectLevel} />
        </div>
      ) : (
        <BoardGame
          game={GAMES[gameId]}
          nextLevel={nextLevel}
          openLevelsSelection={openLevelsSelection}
        />
      )}
    </div>
  );
}

export default App;
