import React from 'react';

const QuestionScreen = ({ question, progress, onAnswer, questionNumber }) => {
  return (
    <div className="screen question-screen">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="content">
        <div className="question-number">Question {questionNumber}</div>
        <h2 className="question-text">{question}</h2>
        
        <div className="answer-buttons">
          <button 
            className="btn btn-answer btn-yes" 
            onClick={() => onAnswer('yes')}
          >
            ✓ Yes
          </button>
          
          <button 
            className="btn btn-answer btn-probably" 
            onClick={() => onAnswer('probably')}
          >
            👍 Probably
          </button>
          
          <button 
            className="btn btn-answer btn-dont-know" 
            onClick={() => onAnswer('dont_know')}
          >
            🤷 Don't Know
          </button>
          
          <button 
            className="btn btn-answer btn-probably-not" 
            onClick={() => onAnswer('probably_not')}
          >
            👎 Probably Not
          </button>
          
          <button 
            className="btn btn-answer btn-no" 
            onClick={() => onAnswer('no')}
          >
            ✗ No
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
