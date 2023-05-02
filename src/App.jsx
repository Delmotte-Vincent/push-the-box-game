import { useEffect, useState } from 'react';
import './App.css';
import BoardGame from './components/BoardGame/BoardGame';
import { GAMES } from './mocks/games';
import SelectLevel from './components/SelectLevel/SelectLevel';
import useLocalStorage from './hooks/useLocalStorage';

const LEVELS = [
  { id: 1, stars: 0, completed: false },
  { id: 2, stars: 0, completed: false },
  { id: 3, stars: 0, completed: false },
  { id: 4, stars: 0, completed: false },
  { id: 5, stars: 0, completed: false },
  { id: 6, stars: 0, completed: false },
  { id: 7, stars: 0, completed: false },
  { id: 8, stars: 0, completed: false },
  { id: 9, stars: 0, completed: false }
];

function App() {
  const storage = useLocalStorage();
  const [isWelcome, setWelcome] = useState(true);
  const [gameId, setGameId] = useState(0);
  const [levels, setLevels] = useState(storage.getLocalStorageLevels() || LEVELS);
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
          <SelectLevel levels={levels} selectLevel={selectLevel} />
        </div>
      ) : (
        <BoardGame
          levels={levels}
          setLevels={setLevels}
          game={GAMES[gameId]}
          nextLevel={nextLevel}
          openLevelsSelection={openLevelsSelection}
        />
      )}
    </div>
  );
}

export default App;
