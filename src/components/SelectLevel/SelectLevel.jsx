import StarsRate from '../StarsrRate/StarsRate';
import './SelectLevel.css';

export default function SelectLevel({ levels, selectLevel }) {
  return (
    <div className="levels-container">
      {levels.map((level) => (
        <div
          className={`level-button ${level.completed ? 'completed' : ''}`}
          key={`level-${level.id}`}
          onClick={() => selectLevel(level.id)}>
          <h1>Level {level.id}</h1>
          <StarsRate starsNumber={level.stars} />
        </div>
      ))}
    </div>
  );
}
