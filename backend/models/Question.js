const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['general', 'appearance', 'personality', 'occupation', 'origin', 'abilities'],
    default: 'general'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Question', questionSchema);
