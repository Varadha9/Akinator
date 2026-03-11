const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/start-game', gameController.startGame);
router.post('/answer-question', gameController.answerQuestion);
router.post('/submit-feedback', gameController.submitFeedback);
router.post('/submit-new-character', gameController.submitNewCharacter);
router.get('/stats', gameController.getStats);

module.exports = router;
