import React from 'react';

const GuessScreen = ({ character, confidence, onCorrect, onWrong }) => {
  return (
    <div className="screen guess-screen">
      <div className="content">
        <div className="guess-animation">
          <div className="crystal-ball">🔮</div>
        </div>
        
        <h2 className="guess-title">I think I know!</h2>
        
        <div className="character-card">
          <h1 className="character-name">{character}</h1>
          <div className="confidence-meter">
            <div className="confidence-label">Confidence</div>
            <div className="confidence-bar">
              <div 
                className="confidence-fill" 
                style={{ width: `${confidence * 100}%` }}
              ></div>
            </div>
            <div className="confidence-value">{(confidence * 100).toFixed(0)}%</div>
          </div>
        </div>

        <div className="feedback-buttons">
          <button 
            className="btn btn-success btn-large" 
            onClick={onCorrect}
          >
            ✓ Correct!
          </button>
          
          <button 
            className="btn btn-error btn-large" 
            onClick={onWrong}
          >
            ✗ Wrong
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuessScreen;
