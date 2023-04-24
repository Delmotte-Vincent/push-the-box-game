import './ResultBoard.css';

export default function ResultBoard({ numberOfMove, nextLevel, restart, openLevelsSelection }) {
  return (
    <div className="result-board-container">
      <h1>Victoire !</h1>
      <p>Mouvements: {numberOfMove}</p>
      <div className="buttons-container">
        <button onClick={restart}>Rejouer</button>
        <button onClick={nextLevel}>Niveau suivant</button>
        <button onClick={openLevelsSelection}>Niveaux</button>
      </div>
    </div>
  );
}
