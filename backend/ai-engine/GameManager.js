const { v4: uuidv4 } = require('uuid');
const QuestionSelector = require('./QuestionSelector');
const ProbabilityEngine = require('./ProbabilityEngine');
const GuessGenerator = require('./GuessGenerator');

class GameManager {
  constructor() {
    this.sessions = new Map();
  }

  createSession(category = 'all') {
    const sessionId = uuidv4();
    
    const session = {
      sessionId,
      category,
      userAnswers: [],
      questionSelector: new QuestionSelector(),
      probabilityEngine: new ProbabilityEngine(),
      guessGenerator: new GuessGenerator(0.7),
      startTime: Date.now(),
      questionCount: 0
    };

    this.sessions.set(sessionId, session);
    return sessionId;
  }

  getSession(sessionId) {
    return this.sessions.get(sessionId);
  }

  addAnswer(sessionId, questionId, questionText, answer) {
    const session = this.getSession(sessionId);
    
    if (!session) {
      throw new Error('Session not found');
    }

    session.userAnswers.push({
      questionId,
      questionText,
      answer
    });

    session.questionCount++;
  }

  async getNextQuestion(sessionId, questions, characters) {
    const session = this.getSession(sessionId);
    
    if (!session) {
      throw new Error('Session not found');
    }

    // Filter characters by category if specified
    let filteredCharacters = characters;
    if (session.category !== 'all') {
      filteredCharacters = characters.filter(c => c.category === session.category);
    }

    // Calculate current probabilities
    const probabilities = session.probabilityEngine.calculateProbabilities(
      filteredCharacters,
      session.userAnswers
    );

    // Check if we should make a guess
    const shouldGuess = session.guessGenerator.shouldMakeGuess(
      probabilities,
      session.questionCount,
      20
    );

    if (shouldGuess) {
      return {
        shouldGuess: true,
        guess: session.guessGenerator.generateGuess(probabilities, filteredCharacters)
      };
    }

    // Select next question
    const nextQuestion = session.questionSelector.selectNextQuestion(
      questions,
      filteredCharacters,
      session.userAnswers,
      probabilities
    );

    return {
      shouldGuess: false,
      question: nextQuestion,
      progress: Math.min((session.questionCount / 20) * 100, 100)
    };
  }

  endSession(sessionId) {
    this.sessions.delete(sessionId);
  }

  cleanupOldSessions(maxAge = 3600000) { // 1 hour
    const now = Date.now();
    
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.startTime > maxAge) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

module.exports = GameManager;
