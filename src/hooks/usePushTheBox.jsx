import { useState, useEffect } from 'react';

export default function usePushTheBox(game) {
  const [moveCounter, setMoveCounter] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(game.initialPlayerPosition);
  const [boxes, setBoxes] = useState(JSON.parse(JSON.stringify(game.boxes)));
  const [isWin, setWin] = useState(false);

  useEffect(() => {
    setMoveCounter(0);
    setPlayerPosition(game.initialPlayerPosition);
    setBoxes(JSON.parse(JSON.stringify(game.boxes)));
    setWin(false);
  }, [game.id]);

  useEffect(() => {
    setWin(
      boxes.every((box) => game.targets.some((target) => box.x === target.x && box.y === target.y))
    );
  }, [playerPosition]);

  const canPlayerMove = (position) => {
    if (isOutOfBoard(position) || isWallCollision(position)) {
      return false;
    }
    return true;
  };

  const isOutOfBoard = (position) => {
    return (
      position.x > game.bordSize - 1 ||
      position.x < 0 ||
      position.y > game.bordSize - 1 ||
      position.y < 0
    );
  };

  const isWallCollision = (position) => {
    return game.walls.some((wall) => position.x === wall.x && position.y === wall.y);
  };

  const isBoxCollision = (position) => {
    return boxes.some((wall) => position.x === wall.x && position.y === wall.y);
  };

  const movePlayer = (position) => {
    setPlayerPosition(position);
  };

  const isPushableBox = (position) => {
    return !isWallCollision(position) && !isOutOfBoard(position) && !isBoxCollision(position);
  };

  const resetGame = () => {
    setMoveCounter(0);
    setPlayerPosition(game.initialPlayerPosition);
    setBoxes(JSON.parse(JSON.stringify(game.boxes)));
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
    setMoveCounter((prev) => prev + 1);
  };
  const moveBoxLeft = (position) => {
    boxes.map((box) => {
      if (box.x === position.x && box.y === position.y) {
        box.x -= 1;
      }
      return box;
    });
    setMoveCounter((prev) => prev + 1);
  };
  const moveBoxUp = (position) => {
    boxes.map((box) => {
      if (box.x === position.x && box.y === position.y) {
        box.y -= 1;
      }
      return box;
    });
    setMoveCounter((prev) => prev + 1);
  };
  const moveBoxDown = (position) => {
    boxes.map((box) => {
      if (box.x === position.x && box.y === position.y) {
        box.y += 1;
      }
      return box;
    });
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

  return {
    playerPosition,
    boxes,
    moveCounter,
    isWin,
    movePlayerRight,
    movePlayerLeft,
    movePlayerUp,
    movePlayerDown,
    resetGame
  };
}
