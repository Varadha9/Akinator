class QuestionSelector {
  constructor() {
    this.askedQuestions = new Set();
  }

  selectNextQuestion(questions, characters, userAnswers, probabilities) {
    // Filter out already asked questions
    const availableQuestions = questions.filter(
      q => !this.askedQuestions.has(q._id.toString())
    );

    if (availableQuestions.length === 0) {
      return null;
    }

    // Calculate information gain for each question
    let bestQuestion = null;
    let maxGain = -Infinity;

    availableQuestions.forEach(question => {
      const gain = this.calculateInformationGain(question, characters, probabilities);
      
      if (gain > maxGain) {
        maxGain = gain;
        bestQuestion = question;
      }
    });

    if (bestQuestion) {
      this.askedQuestions.add(bestQuestion._id.toString());
    }

    return bestQuestion;
  }

  calculateInformationGain(question, characters, probabilities) {
    // Current entropy
    const currentEntropy = this.calculateEntropy(probabilities);

    // Simulate answers and calculate expected entropy
    const answerTypes = ['yes', 'no', 'probably', 'probably_not'];
    let expectedEntropy = 0;

    answerTypes.forEach(answerType => {
      const filteredChars = this.filterCharactersByAnswer(
        characters,
        question._id,
        answerType
      );

      if (filteredChars.length > 0) {
        const proportion = filteredChars.length / characters.length;
        const entropy = this.calculateEntropyForCharacters(filteredChars, probabilities);
        expectedEntropy += proportion * entropy;
      }
    });

    return currentEntropy - expectedEntropy;
  }

  calculateEntropy(probabilities) {
    let entropy = 0;
    const probs = Object.values(probabilities);

    probs.forEach(p => {
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    });

    return entropy;
  }

  calculateEntropyForCharacters(characters, probabilities) {
    const charIds = characters.map(c => c._id.toString());
    const filteredProbs = {};
    let total = 0;

    charIds.forEach(id => {
      if (probabilities[id]) {
        filteredProbs[id] = probabilities[id];
        total += probabilities[id];
      }
    });

    // Normalize
    Object.keys(filteredProbs).forEach(id => {
      filteredProbs[id] /= total;
    });

    return this.calculateEntropy(filteredProbs);
  }

  filterCharactersByAnswer(characters, questionId, answerType) {
    return characters.filter(character => {
      const answer = character.answers.find(
        a => a.questionId.toString() === questionId.toString()
      );

      if (!answer) return false;

      // Match exact or compatible answers
      if (answer.answer === answerType) return true;
      
      if (answerType === 'yes' && answer.answer === 'probably') return true;
      if (answerType === 'no' && answer.answer === 'probably_not') return true;

      return false;
    });
  }

  reset() {
    this.askedQuestions.clear();
  }
}

module.exports = QuestionSelector;
