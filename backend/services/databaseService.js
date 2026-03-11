const Question = require('../models/Question');
const Character = require('../models/Character');
const GameLog = require('../models/GameLog');

class DatabaseService {
  async getAllQuestions() {
    return await Question.find();
  }

  async getAllCharacters() {
    return await Character.find().populate('answers.questionId');
  }

  async getCharactersByCategory(category) {
    return await Character.find({ category }).populate('answers.questionId');
  }

  async addCharacter(characterData) {
    const character = new Character(characterData);
    return await character.save();
  }

  async addQuestion(questionText, category = 'general') {
    const question = new Question({ text: questionText, category });
    return await question.save();
  }

  async updateCharacterAnswers(characterId, questionId, answer) {
    const character = await Character.findById(characterId);
    
    if (!character) {
      throw new Error('Character not found');
    }

    const existingAnswer = character.answers.find(
      a => a.questionId.toString() === questionId.toString()
    );

    if (existingAnswer) {
      existingAnswer.answer = answer;
    } else {
      character.answers.push({ questionId, answer });
    }

    return await character.save();
  }

  async logGame(gameData) {
    const log = new GameLog(gameData);
    return await log.save();
  }

  async getGameStats() {
    const totalGames = await GameLog.countDocuments();
    const successfulGames = await GameLog.countDocuments({ success: true });
    const successRate = totalGames > 0 ? (successfulGames / totalGames) * 100 : 0;

    return {
      totalGames,
      successfulGames,
      successRate: successRate.toFixed(2)
    };
  }
}

module.exports = new DatabaseService();
