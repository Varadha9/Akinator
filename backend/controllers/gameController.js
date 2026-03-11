const GameManager = require('../ai-engine/GameManager');
const databaseService = require('../services/databaseService');

const gameManager = new GameManager();

// Cleanup old sessions every 30 minutes
setInterval(() => {
  gameManager.cleanupOldSessions();
}, 1800000);

exports.startGame = async (req, res) => {
  try {
    const { category = 'all' } = req.body;
    const sessionId = gameManager.createSession(category);

    res.json({
      success: true,
      sessionId,
      message: 'Game started successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.answerQuestion = async (req, res) => {
  try {
    const { sessionId, questionId, answer } = req.body;

    if (!sessionId || !questionId || !answer) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const session = gameManager.getSession(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Get question text
    const questions = await databaseService.getAllQuestions();
    const question = questions.find(q => q._id.toString() === questionId);

    gameManager.addAnswer(sessionId, questionId, question.text, answer);

    // Get next question or guess
    const characters = await databaseService.getAllCharacters();
    const result = await gameManager.getNextQuestion(sessionId, questions, characters);

    if (result.shouldGuess) {
      res.json({
        success: true,
        shouldGuess: true,
        guess: {
          characterId: result.guess.character._id,
          characterName: result.guess.character.name,
          confidence: result.guess.confidence,
          alternatives: result.guess.alternatives.map(alt => ({
            characterId: alt.character._id,
            characterName: alt.character.name,
            confidence: alt.confidence
          }))
        }
      });
    } else {
      res.json({
        success: true,
        shouldGuess: false,
        question: {
          id: result.question._id,
          text: result.question.text
        },
        progress: result.progress
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.submitFeedback = async (req, res) => {
  try {
    const { sessionId, guessedCharacterId, correct } = req.body;

    const session = gameManager.getSession(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Log the game
    await databaseService.logGame({
      sessionId,
      answers: session.userAnswers,
      guessedCharacter: guessedCharacterId,
      success: correct,
      timestamp: new Date()
    });

    if (correct) {
      gameManager.endSession(sessionId);
      res.json({
        success: true,
        message: 'Thank you for playing!'
      });
    } else {
      res.json({
        success: true,
        message: 'Let me learn from this',
        requiresLearning: true
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.submitNewCharacter = async (req, res) => {
  try {
    const {
      sessionId,
      characterName,
      category,
      distinguishingQuestion,
      distinguishingAnswer
    } = req.body;

    if (!characterName || !category) {
      return res.status(400).json({
        success: false,
        error: 'Character name and category are required'
      });
    }

    const session = gameManager.getSession(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Create new character with existing answers
    const answers = session.userAnswers.map(ua => ({
      questionId: ua.questionId,
      answer: ua.answer
    }));

    // Add distinguishing question if provided
    let newQuestionId = null;
    if (distinguishingQuestion && distinguishingAnswer) {
      const newQuestion = await databaseService.addQuestion(distinguishingQuestion);
      newQuestionId = newQuestion._id;
      
      answers.push({
        questionId: newQuestionId,
        answer: distinguishingAnswer
      });
    }

    // Create character
    const character = await databaseService.addCharacter({
      name: characterName,
      category,
      answers
    });

    // Log the learning
    await databaseService.logGame({
      sessionId,
      answers: session.userAnswers,
      actualCharacter: characterName,
      success: false,
      timestamp: new Date()
    });

    gameManager.endSession(sessionId);

    res.json({
      success: true,
      message: 'Character learned successfully!',
      characterId: character._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await databaseService.getGameStats();
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
