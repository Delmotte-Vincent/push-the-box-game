import { useEffect, useRef, useState } from 'react';
import './App.css'

const BOARD_SIZE = 10;

const WALLS = [{x: 1, y: 4}, {x: 1, y: 5}, {x: 1, y: 6}, {x: 1, y: 7}];
const BOXES = [{x: 4, y: 4}]

function App() {
  const [playerPosition, setPlayerPosition] = useState({x: 0, y: 0});
  const [boxes, setBoxes] = useState();
  const [boardDimension, setBoardDimension] = useState(0);

  const boardRef = useRef(null);

  useEffect(() => {
    setBoardDimension(boardRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [playerPosition])

  const onKeyDown = (event) => {
    switch(event.code) {
        case "ArrowRight": 
          movePlayerRight()
          break;
        case "ArrowLeft": 
          movePlayerLeft()
          break;
        case "ArrowUp": 
          movePlayerUp()
          break;
        case "ArrowDown": 
          movePlayerDown()
          break;
      }
  } 

  const canPlayerMove = (position) => { 
    if (isOutOfBoard(position)) {
      return false;
    }
    if (isCollision(position)) {
      return false;
    }
    return true;
  }

  const isOutOfBoard = (position) => {
    return position.x > BOARD_SIZE - 1 || position.x < 0 || position.y > BOARD_SIZE - 1 || position.y < 0;
  }

  const isCollision = (position) => {
    return WALLS.some((wall) => position.x === wall.x && position.y === wall.y);
  }

  const movePlayerRight = () => {
      const nextPosition = {...playerPosition, x: playerPosition.x + 1};
      if (canPlayerMove(nextPosition)) {
        setPlayerPosition(nextPosition);
      } 
  }

  const movePlayerLeft = () => {
    const nextPosition = {...playerPosition, x: playerPosition.x - 1};
    if (canPlayerMove(nextPosition)) {
      setPlayerPosition(nextPosition);
    } 
  }

  const movePlayerUp = () => {
    const nextPosition = {...playerPosition, y: playerPosition.y - 1};
    if (canPlayerMove(nextPosition)) {
      setPlayerPosition(nextPosition);
    } 
  }

  const movePlayerDown = () => {
    const nextPosition = {...playerPosition, y: playerPosition.y + 1};
    if (canPlayerMove(nextPosition)) {
      setPlayerPosition(nextPosition);
    } 
  }

  return (
    <div className="App">
      <div className='board' ref={boardRef}>
        <div className='player' style={{left: playerPosition.x * boardDimension / BOARD_SIZE, top: playerPosition.y * boardDimension / BOARD_SIZE, width: boardDimension / BOARD_SIZE, height: boardDimension / BOARD_SIZE}} />
        {WALLS.map((wall, index) => (<div key={index} className='wall' style={{left: wall.x * boardDimension / BOARD_SIZE, top: wall.y * boardDimension / BOARD_SIZE, width: boardDimension / BOARD_SIZE, height: boardDimension / BOARD_SIZE}} /> ))}
        {BOXES.map((box, index) => (<div key={index} className='box' style={{left: box.x * boardDimension / BOARD_SIZE, top: box.y * boardDimension / BOARD_SIZE, width: boardDimension / BOARD_SIZE, height: boardDimension / BOARD_SIZE}} /> ))}
      </div>
    </div>
  )
}

export default App
