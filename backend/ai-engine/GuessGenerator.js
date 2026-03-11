class GuessGenerator {
  constructor(confidenceThreshold = 0.7) {
    this.confidenceThreshold = confidenceThreshold;
  }

  shouldMakeGuess(probabilities, questionCount, maxQuestions = 20) {
    const maxProb = Math.max(...Object.values(probabilities));
    
    // Make guess if confidence is high enough or max questions reached
    return maxProb >= this.confidenceThreshold || questionCount >= maxQuestions;
  }

  generateGuess(probabilities, characters) {
    let maxProb = 0;
    let bestCharacterId = null;

    Object.entries(probabilities).forEach(([charId, prob]) => {
      if (prob > maxProb) {
        maxProb = prob;
        bestCharacterId = charId;
      }
    });

    const character = characters.find(c => c._id.toString() === bestCharacterId);

    return {
      character,
      confidence: maxProb,
      alternatives: this.getAlternatives(probabilities, characters, bestCharacterId)
    };
  }

  getAlternatives(probabilities, characters, excludeId) {
    const alternatives = Object.entries(probabilities)
      .filter(([charId]) => charId !== excludeId)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([charId, prob]) => ({
        character: characters.find(c => c._id.toString() === charId),
        confidence: prob
      }));

    return alternatives;
  }
}

module.exports = GuessGenerator;
