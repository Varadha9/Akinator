import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="screen start-screen">
      <div className="content">
        <h1 className="title">🔮 Akinator AI</h1>
        <p className="subtitle">Think of a character, and I'll guess who it is!</p>
        
        <div className="instructions">
          <h3>How to Play:</h3>
          <ol>
            <li>Think of any character (real or fictional)</li>
            <li>Answer my questions honestly</li>
            <li>I'll try to guess your character</li>
            <li>Help me learn if I'm wrong!</li>
          </ol>
        </div>

        <button className="btn btn-primary btn-large" onClick={() => onStart('all')}>
          Start Game
        </button>

        <div className="category-selection">
          <p>Or choose a category:</p>
          <div className="category-buttons">
            <button className="btn btn-category" onClick={() => onStart('movies')}>🎬 Movies</button>
            <button className="btn btn-category" onClick={() => onStart('anime')}>🎌 Anime</button>
            <button className="btn btn-category" onClick={() => onStart('sports')}>⚽ Sports</button>
            <button className="btn btn-category" onClick={() => onStart('tech')}>💻 Tech</button>
            <button className="btn btn-category" onClick={() => onStart('indian')}>🇮🇳 Indian</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
