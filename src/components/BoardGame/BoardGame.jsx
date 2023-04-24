import { useState, useRef, useEffect } from 'react';
import './BoardGame.css';
import usePushTheBox from '../../hooks/usePushTheBox';
import ResultBoard from '../ResultBoard/ResultBoard';

export default function BoardGame({ game, nextLevel, openLevelsSelection }) {
  const [boardDimension, setBoardDimension] = useState(0);

  const pushTheBox = usePushTheBox(game);

  const boardRef = useRef(null);

  useEffect(() => {
    setBoardDimension(boardRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    if (!pushTheBox.isWin) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [pushTheBox.playerPosition, pushTheBox.isWin]);

  const onKeyDown = (event) => {
    switch (event.code) {
      case 'ArrowRight':
        pushTheBox.movePlayerRight();
        break;
      case 'ArrowLeft':
        pushTheBox.movePlayerLeft();
        break;
      case 'ArrowUp':
        pushTheBox.movePlayerUp();
        break;
      case 'ArrowDown':
        pushTheBox.movePlayerDown();
        break;
    }
  };

  const renderGrounds = (grounds) => {
    //todo enlever
    return grounds?.map((wall, index) => (
      <div
        key={`ground-${index}`}
        className="ground"
        style={{
          left: (wall.x * boardDimension) / game.bordSize,
          top: (wall.y * boardDimension) / game.bordSize,
          width: boardDimension / game.bordSize,
          aspectRatio: 1
        }}
      />
    ));
  };

  const renderWalls = (walls) => {
    return walls.map((wall, index) => (
      <div
        key={`wall-${index}`}
        className="wall"
        style={{
          left: (wall.x * boardDimension) / game.bordSize,
          top: (wall.y * boardDimension) / game.bordSize,
          width: boardDimension / game.bordSize,
          aspectRatio: 1
        }}
      />
    ));
  };

  const renderBoxes = (boxes) => {
    return boxes.map((box, index) => (
      <div
        key={index}
        className="box"
        style={{
          left: (box.x * boardDimension) / game.bordSize,
          top: (box.y * boardDimension) / game.bordSize,
          width: boardDimension / game.bordSize,
          aspectRatio: 1
        }}
      />
    ));
  };

  // useMemo on target and wall
  const renderTargets = (targets) => {
    return targets.map((box, index) => (
      <div
        key={index}
        className="target"
        style={{
          left: (box.x * boardDimension) / game.bordSize,
          top: (box.y * boardDimension) / game.bordSize,
          width: boardDimension / game.bordSize,
          aspectRatio: 1
        }}
      />
    ));
  };

  return (
    <>
      {pushTheBox.isWin ? (
        <ResultBoard
          numberOfMove={pushTheBox.moveCounter}
          restart={pushTheBox.resetGame}
          nextLevel={nextLevel}
          openLevelsSelection={openLevelsSelection}
        />
      ) : (
        <div className="board">
          <div className="board-game" ref={boardRef}>
            <div
              className="player"
              style={{
                left: (pushTheBox.playerPosition.x * boardDimension) / game.bordSize,
                top: (pushTheBox.playerPosition.y * boardDimension) / game.bordSize,
                width: boardDimension / game.bordSize,
                aspectRatio: 1
              }}
            />
            {renderGrounds(game.grounds)}
            {renderWalls(game.walls)}
            {renderBoxes(pushTheBox.boxes)}
            {renderTargets(game.targets)}
          </div>
          <div className="score-bord">
            <h1>Score</h1>
            <p>Mouvements : {pushTheBox.moveCounter}</p>
            <p>Boxes : 0 / {pushTheBox.boxes.length} </p>
            <div className="actions-container">
              <button>Rejouer</button>
              <button>Niveaux</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
