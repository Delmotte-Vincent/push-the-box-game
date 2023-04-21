import { useEffect, useRef, useState } from 'react';
import './App.css';

const BOARD_SIZE = 15;

const WALLS = [
  { x: 1, y: 4 },
  { x: 1, y: 5 },
  { x: 1, y: 6 },
  { x: 1, y: 7 }
];
const BOXES = [{ x: 4, y: 4 }];

const TARGETS = [{ x: 8, y: 8 }];

const INITIAL_PLAYER_POSITION = {
  x: 0,
  y: 0
};

function App() {
  const [moveCounter, setMoveCounter] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(INITIAL_PLAYER_POSITION);
  const [boxes, setBoxes] = useState(JSON.parse(JSON.stringify(BOXES)));
  const [boardDimension, setBoardDimension] = useState(0);
  const [isWin, setWin] = useState(false);

  const boardRef = useRef(null);

  useEffect(() => {
    setBoardDimension(boardRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [playerPosition]);

  useEffect(() => {
    setWin(winCondition());
  }, [playerPosition]);

  const winCondition = () => {
    return boxes.every((box) => TARGETS.some((target) => box.x === target.x && box.y === target.y));
  };

  const onKeyDown = (event) => {
    switch (event.code) {
      case 'ArrowRight':
        movePlayerRight();
        break;
      case 'ArrowLeft':
        movePlayerLeft();
        break;
      case 'ArrowUp':
        movePlayerUp();
        break;
      case 'ArrowDown':
        movePlayerDown();
        break;
    }
  };

  const resetGame = () => {
    setPlayerPosition(INITIAL_PLAYER_POSITION);
    setBoxes(JSON.parse(JSON.stringify(BOXES)));
    setMoveCounter(0);
  };

  const canPlayerMove = (position) => {
    if (isOutOfBoard(position) || isWallCollision(position)) {
      return false;
    }
    return true;
  };

  const isOutOfBoard = (position) => {
    return (
      position.x > BOARD_SIZE - 1 || position.x < 0 || position.y > BOARD_SIZE - 1 || position.y < 0
    );
  };

  const isWallCollision = (position) => {
    return WALLS.some((wall) => position.x === wall.x && position.y === wall.y);
  };

  const isBoxCollision = (position) => {
    return boxes.some((wall) => position.x === wall.x && position.y === wall.y);
  };

  const isPushableBox = (position) => {
    return !isWallCollision(position) && !isOutOfBoard(position);
  };

  const movePlayer = (position) => {
    setPlayerPosition(position);
    setMoveCounter((prev) => prev + 1);
  };

  /**
   * PLAYER MOVE
   */
  const movePlayerRight = () => {
    const playerNextPosition = { ...playerPosition, x: playerPosition.x + 1 };
    if (canPlayerMove(playerNextPosition)) {
      if (isBoxCollision(playerNextPosition)) {
        const boxNextPosition = { ...playerNextPosition, x: playerNextPosition.x + 1 };
        if (isPushableBox(boxNextPosition)) {
          moveBoxRight(playerNextPosition);
          movePlayer(playerNextPosition);
        }
      } else {
        movePlayer(playerNextPosition);
      }
    }
  };

  const movePlayerLeft = () => {
    const playerNextPosition = { ...playerPosition, x: playerPosition.x - 1 };
    if (canPlayerMove(playerNextPosition)) {
      if (isBoxCollision(playerNextPosition)) {
        const boxNextPosition = { ...playerNextPosition, x: playerNextPosition.x - 1 };
        if (isPushableBox(boxNextPosition)) {
          moveBoxLeft(playerNextPosition);
          movePlayer(playerNextPosition);
        }
      } else {
        movePlayer(playerNextPosition);
      }
    }
  };

  const movePlayerUp = () => {
    const playerNextPosition = { ...playerPosition, y: playerPosition.y - 1 };
    if (canPlayerMove(playerNextPosition)) {
      if (isBoxCollision(playerNextPosition)) {
        const boxNextPosition = { ...playerNextPosition, y: playerNextPosition.y - 1 };
        if (isPushableBox(boxNextPosition)) {
          moveBoxUp(playerNextPosition);
          movePlayer(playerNextPosition);
        }
      } else {
        movePlayer(playerNextPosition);
      }
    }
  };

  const movePlayerDown = () => {
    const playerNextPosition = { ...playerPosition, y: playerPosition.y + 1 };
    if (canPlayerMove(playerNextPosition)) {
      if (isBoxCollision(playerNextPosition)) {
        const boxNextPosition = { ...playerNextPosition, y: playerNextPosition.y + 1 };
        if (isPushableBox(boxNextPosition)) {
          moveBoxDown(playerNextPosition);
          movePlayer(playerNextPosition);
        }
      } else {
        movePlayer(playerNextPosition);
      }
    }
  };

  /**
   * BOX MOVE
   */

  const moveBoxRight = (position) => {
    boxes.map((box) => {
      if (box.x === position.x && box.y === position.y) {
        box.x += 1;
      }
      return box;
    });
  };
  const moveBoxLeft = (position) => {
    boxes.map((box) => {
      if (box.x === position.x && box.y === position.y) {
        box.x -= 1;
      }
      return box;
    });
  };
  const moveBoxUp = (position) => {
    boxes.map((box) => {
      if (box.x === position.x && box.y === position.y) {
        box.y -= 1;
      }
      return box;
    });
  };
  const moveBoxDown = (position) => {
    boxes.map((box) => {
      if (box.x === position.x && box.y === position.y) {
        box.y += 1;
      }
      return box;
    });
  };

  return (
    <div className="App">
      <div>Moves: {moveCounter}</div>
      <button onClick={resetGame}>Restart</button>
      <div className="board" ref={boardRef}>
        <div
          className="player"
          style={{
            left: (playerPosition.x * boardDimension) / BOARD_SIZE,
            top: (playerPosition.y * boardDimension) / BOARD_SIZE,
            width: boardDimension / BOARD_SIZE,
            aspectRatio: 1
          }}
        />
        {WALLS.map((wall, index) => (
          <div
            key={index}
            className="wall"
            style={{
              left: (wall.x * boardDimension) / BOARD_SIZE,
              top: (wall.y * boardDimension) / BOARD_SIZE,
              width: boardDimension / BOARD_SIZE,
              aspectRatio: 1
            }}
          />
        ))}
        {boxes.map((box, index) => (
          <div
            key={index}
            className="box"
            style={{
              left: (box.x * boardDimension) / BOARD_SIZE,
              top: (box.y * boardDimension) / BOARD_SIZE,
              width: boardDimension / BOARD_SIZE,
              aspectRatio: 1
            }}
          />
        ))}
        {TARGETS.map((box, index) => (
          <div
            key={index}
            className="target"
            style={{
              left: (box.x * boardDimension) / BOARD_SIZE,
              top: (box.y * boardDimension) / BOARD_SIZE,
              width: boardDimension / BOARD_SIZE,
              aspectRatio: 1
            }}
          />
        ))}
      </div>
      {isWin && <div>you win</div>}
    </div>
  );
}

export default App;
