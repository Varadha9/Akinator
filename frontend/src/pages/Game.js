import React, { useState } from 'react';
import StartScreen from '../components/StartScreen';
import QuestionScreen from '../components/QuestionScreen';
import GuessScreen from '../components/GuessScreen';
import LearningScreen from '../components/LearningScreen';
import { startGame, answerQuestion, submitFeedback, submitNewCharacter } from '../services/api';

const Game = () => {
  const [gameState, setGameState] = useState('start'); // start, question, guess, learning, end
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [guessedCharacter, setGuessedCharacter] = useState(null);
  const [guessedCharacterId, setGuessedCharacterId] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStartGame = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const response = await startGame(category);
      setSessionId(response.sessionId);
      
      // Get first question by answering with a dummy to trigger question flow
      const firstResponse = await answerQuestion(response.sessionId, 'init', 'init');
      
      if (firstResponse.shouldGuess) {
        setGuessedCharacter(firstResponse.guess.characterName);
        setGuessedCharacterId(firstResponse.guess.characterId);
        setConfidence(firstResponse.guess.confidence);
        setGameState('guess');
      } else {
        setCurrentQuestion(firstResponse.question.text);
        setCurrentQuestionId(firstResponse.question.id);
        setProgress(firstResponse.progress || 0);
        setQuestionNumber(1);
        setGameState('question');
      }
    } catch (err) {
      setError('Failed to start game. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await answerQuestion(sessionId, currentQuestionId, answer);
      
      if (response.shouldGuess) {
        setGuessedCharacter(response.guess.characterName);
        setGuessedCharacterId(response.guess.characterId);
        setConfidence(response.guess.confidence);
        setGameState('guess');
      } else {
        setCurrentQuestion(response.question.text);
        setCurrentQuestionId(response.question.id);
        setProgress(response.progress || 0);
        setQuestionNumber(questionNumber + 1);
      }
    } catch (err) {
      setError('Failed to process answer. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCorrectGuess = async () => {
    try {
      setLoading(true);
      await submitFeedback(sessionId, guessedCharacterId, true);
      setGameState('end');
    } catch (err) {
      setError('Failed to submit feedback.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWrongGuess = async () => {
    try {
      setLoading(true);
      await submitFeedback(sessionId, guessedCharacterId, false);
      setGameState('learning');
    } catch (err) {
      setError('Failed to submit feedback.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitNewCharacter = async (name, category, question, answer) => {
    try {
      setLoading(true);
      await submitNewCharacter(sessionId, name, category, question, answer);
      setGameState('end');
    } catch (err) {
      setError('Failed to submit character.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSkipLearning = () => {
    setGameState('end');
  };

  const handlePlayAgain = () => {
    setGameState('start');
    setSessionId(null);
    setCurrentQuestion(null);
    setCurrentQuestionId(null);
    setProgress(0);
    setQuestionNumber(0);
    setGuessedCharacter(null);
    setGuessedCharacterId(null);
    setConfidence(0);
    setError(null);
  };

  return (
    <div className="game-container">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {gameState === 'start' && (
        <StartScreen onStart={handleStartGame} />
      )}

      {gameState === 'question' && (
        <QuestionScreen
          question={currentQuestion}
          progress={progress}
          questionNumber={questionNumber}
          onAnswer={handleAnswer}
        />
      )}

      {gameState === 'guess' && (
        <GuessScreen
          character={guessedCharacter}
          confidence={confidence}
          onCorrect={handleCorrectGuess}
          onWrong={handleWrongGuess}
        />
      )}

      {gameState === 'learning' && (
        <LearningScreen
          onSubmit={handleSubmitNewCharacter}
          onSkip={handleSkipLearning}
        />
      )}

      {gameState === 'end' && (
        <div className="screen end-screen">
          <div className="content">
            <h1>🎉 Thanks for Playing!</h1>
            <p>I'm getting smarter with every game.</p>
            <button className="btn btn-primary btn-large" onClick={handlePlayAgain}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
