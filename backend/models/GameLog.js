const mongoose = require('mongoose');

const gameLogSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    questionText: String,
    answer: String
  }],
  guessedCharacter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character'
  },
  actualCharacter: String,
  success: Boolean,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GameLog', gameLogSchema);
