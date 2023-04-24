import StarsRate from '../StarsrRate/StarsRate';
import './SelectLevel.css';

const LEVELS = [
  { id: 1, stars: 1, completed: true },
  { id: 2, stars: 1, completed: true },
  { id: 3, stars: 3, completed: true },
  { id: 4, stars: 1, completed: true },
  { id: 5, stars: 3, completed: true },
  { id: 6, stars: 0, completed: false },
  { id: 7, stars: 0, completed: false },
  { id: 8, stars: 0, completed: false },
  { id: 9, stars: 0, completed: false }
];

export default function SelectLevel({ selectLevel }) {
  return (
    <div className="levels-container">
      {LEVELS.map((level) => (
        <div
          className="level-button"
          key={`level-${level.id}`}
          onClick={() => selectLevel(level.id)}>
          <h1>Level {level.id}</h1>
          <StarsRate starsNumber={level.stars} />
        </div>
      ))}
    </div>
  );
}
