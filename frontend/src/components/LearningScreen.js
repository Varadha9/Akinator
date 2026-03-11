import React, { useState } from 'react';

const LearningScreen = ({ onSubmit, onSkip }) => {
  const [characterName, setCharacterName] = useState('');
  const [category, setCategory] = useState('movies');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('yes');

  const handleSubmit = () => {
    if (characterName.trim()) {
      onSubmit(characterName, category, question, answer);
    }
  };

  return (
    <div className="screen learning-screen">
      <div className="content">
        <h2 className="learning-title">Help Me Learn! 📚</h2>
        <p className="learning-subtitle">I want to get better at guessing characters.</p>

        <div className="form">
          <div className="form-group">
            <label>What was your character?</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter character name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select 
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="movies">Movies</option>
              <option value="anime">Anime</option>
              <option value="sports">Sports</option>
              <option value="tech">Tech</option>
              <option value="indian">Indian</option>
              <option value="music">Music</option>
              <option value="historical">Historical</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>A question that would help identify this character (optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Does your character wear a red suit?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {question && (
            <div className="form-group">
              <label>Answer for your character</label>
              <select 
                className="form-select"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="probably">Probably</option>
                <option value="dont_know">Don't Know</option>
                <option value="probably_not">Probably Not</option>
                <option value="no">No</option>
              </select>
            </div>
          )}

          <div className="form-buttons">
            <button 
              className="btn btn-primary btn-large" 
              onClick={handleSubmit}
              disabled={!characterName.trim()}
            >
              Submit
            </button>
            
            <button 
              className="btn btn-secondary" 
              onClick={onSkip}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningScreen;
