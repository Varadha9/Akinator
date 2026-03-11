class ProbabilityEngine {
  constructor() {
    this.answerWeights = {
      yes: 1.0,
      probably: 0.5,
      dont_know: 0.0,
      probably_not: -0.5,
      no: -1.0
    };
  }

  calculateProbabilities(characters, userAnswers) {
    const scores = {};
    
    characters.forEach(character => {
      scores[character._id] = this.calculateCharacterScore(character, userAnswers);
    });

    // Normalize to probabilities
    const total = Object.values(scores).reduce((sum, score) => sum + Math.exp(score), 0);
    const probabilities = {};
    
    Object.keys(scores).forEach(charId => {
      probabilities[charId] = Math.exp(scores[charId]) / total;
    });

    return probabilities;
  }

  calculateCharacterScore(character, userAnswers) {
    let score = 0;
    let matchCount = 0;
    let mismatchCount = 0;

    userAnswers.forEach(userAnswer => {
      const charAnswer = character.answers.find(
        a => a.questionId.toString() === userAnswer.questionId.toString()
      );

      if (charAnswer) {
        const compatibility = this.getCompatibility(userAnswer.answer, charAnswer.answer);
        score += compatibility;
        
        if (compatibility > 0) matchCount++;
        else if (compatibility < 0) mismatchCount++;
      }
    });

    // Penalize mismatches more heavily
    const penalty = mismatchCount * 2;
    const bonus = matchCount * 1.5;
    
    return score + bonus - penalty;
  }

  getCompatibility(userAnswer, characterAnswer) {
    const userWeight = this.answerWeights[userAnswer];
    const charWeight = this.answerWeights[characterAnswer];

    // Perfect match
    if (userAnswer === characterAnswer) {
      return Math.abs(userWeight) * 2;
    }

    // Compatible answers
    if ((userWeight > 0 && charWeight > 0) || (userWeight < 0 && charWeight < 0)) {
      return Math.abs(userWeight + charWeight) / 2;
    }

    // Neutral answer
    if (userAnswer === 'dont_know') {
      return 0;
    }

    // Conflicting answers
    return -(Math.abs(userWeight) + Math.abs(charWeight));
  }

  getBestGuess(probabilities, characters) {
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
      confidence: maxProb
    };
  }

  shouldMakeGuess(probabilities, threshold = 0.7) {
    const maxProb = Math.max(...Object.values(probabilities));
    return maxProb >= threshold;
  }
}

module.exports = ProbabilityEngine;
