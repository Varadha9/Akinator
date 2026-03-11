import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const startGame = async (category = 'all') => {
  const response = await api.post('/start-game', { category });
  return response.data;
};

export const answerQuestion = async (sessionId, questionId, answer) => {
  const response = await api.post('/answer-question', {
    sessionId,
    questionId,
    answer
  });
  return response.data;
};

export const submitFeedback = async (sessionId, guessedCharacterId, correct) => {
  const response = await api.post('/submit-feedback', {
    sessionId,
    guessedCharacterId,
    correct
  });
  return response.data;
};

export const submitNewCharacter = async (sessionId, characterName, category, distinguishingQuestion, distinguishingAnswer) => {
  const response = await api.post('/submit-new-character', {
    sessionId,
    characterName,
    category,
    distinguishingQuestion,
    distinguishingAnswer
  });
  return response.data;
};

export const getStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};

export default api;
