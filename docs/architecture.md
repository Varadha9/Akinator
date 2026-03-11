# Akinator AI - System Architecture

## Overview

Akinator AI is a production-ready character guessing system that uses advanced AI algorithms to predict characters through intelligent questioning.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         User Interface                       │
│                    (React + CSS + JavaScript)                │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                       │
│                    (Express.js Server)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes: /start-game, /answer-question, /guess, etc  │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Game Engine Layer                       │
│  ┌────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │ Game Manager   │  │ Question Selector│  │ Probability │ │
│  │ (Session State)│  │ (Info Gain Algo) │  │ Engine      │ │
│  └────────────────┘  └──────────────────┘  └─────────────┘ │
│  ┌────────────────┐                                         │
│  │ Guess Generator│                                         │
│  │ (Prediction)   │                                         │
│  └────────────────┘                                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Knowledge Base Layer                      │
│                      (MongoDB Database)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Questions   │  │  Characters  │  │   Game Logs      │  │
│  │  Collection  │  │  Collection  │  │   Collection     │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Frontend Layer (React)

**Purpose**: User interface and interaction

**Components**:
- `StartScreen`: Game initialization and category selection
- `QuestionScreen`: Display questions and capture answers
- `GuessScreen`: Show AI's guess and get feedback
- `LearningScreen`: Collect new character information

**Communication**: REST API calls to backend via Axios

### 2. API Gateway (Express.js)

**Purpose**: Handle HTTP requests and route to appropriate services

**Endpoints**:
- `POST /api/start-game`: Initialize new game session
- `POST /api/answer-question`: Process user answer and return next question
- `POST /api/submit-feedback`: Record if guess was correct
- `POST /api/submit-new-character`: Learn new character
- `GET /api/stats`: Get game statistics

**Responsibilities**:
- Request validation
- Session management
- Error handling
- Response formatting

### 3. Game Engine (AI Logic)

#### 3.1 Game Manager
**Purpose**: Manage game sessions and state

**Responsibilities**:
- Create and track sessions
- Store user answers
- Coordinate between components
- Session cleanup

**Data Structure**:
```javascript
{
  sessionId: "uuid",
  category: "movies",
  userAnswers: [
    { questionId, questionText, answer }
  ],
  questionCount: 5,
  startTime: timestamp
}
```

#### 3.2 Question Selector
**Purpose**: Choose the most informative question

**Algorithm**: Information Gain
```
IG(Q) = H(current) - Σ P(answer) * H(answer)

Where:
- H = Entropy of character distribution
- P(answer) = Probability of each answer
- Best question = argmax(IG)
```

**Process**:
1. Calculate current entropy of character probabilities
2. For each unasked question:
   - Simulate each possible answer
   - Calculate expected entropy after answer
   - Compute information gain
3. Select question with maximum information gain

#### 3.3 Probability Engine
**Purpose**: Calculate character probabilities based on answers

**Algorithm**: Bayesian-inspired scoring
```
Score(C) = Σ Compatibility(UserAnswer, CharAnswer)

Compatibility:
- Perfect match: +2.0
- Compatible: +1.0
- Neutral: 0.0
- Conflict: -2.0

Probability(C) = exp(Score(C)) / Σ exp(Score(all))
```

**Answer Weights**:
- Yes: 1.0
- Probably: 0.5
- Don't Know: 0.0
- Probably Not: -0.5
- No: -1.0

#### 3.4 Guess Generator
**Purpose**: Decide when and what to guess

**Logic**:
- Make guess if confidence ≥ 70% OR questions ≥ 20
- Return top character with confidence score
- Provide alternative guesses

### 4. Knowledge Base (MongoDB)

#### Questions Collection
```javascript
{
  _id: ObjectId,
  text: "Is your character from a movie?",
  category: "origin",
  createdAt: Date
}
```

#### Characters Collection
```javascript
{
  _id: ObjectId,
  name: "Iron Man",
  category: "movies",
  answers: [
    {
      questionId: ObjectId,
      answer: "yes"
    }
  ],
  createdAt: Date
}
```

#### GameLogs Collection
```javascript
{
  _id: ObjectId,
  sessionId: "uuid",
  answers: Array,
  guessedCharacter: ObjectId,
  actualCharacter: String,
  success: Boolean,
  timestamp: Date
}
```

## Data Flow

### Starting a Game
1. User clicks "Start Game"
2. Frontend → POST /api/start-game
3. Backend creates session with GameManager
4. Returns sessionId
5. Frontend requests first question
6. QuestionSelector chooses optimal question
7. Question displayed to user

### Answering Questions
1. User selects answer
2. Frontend → POST /api/answer-question
3. GameManager stores answer
4. ProbabilityEngine updates character scores
5. GuessGenerator checks if ready to guess
6. If not ready:
   - QuestionSelector picks next question
   - Return question to frontend
7. If ready:
   - Return guess to frontend

### Making a Guess
1. GuessScreen displays character
2. User confirms correct/wrong
3. Frontend → POST /api/submit-feedback
4. If correct:
   - Log success
   - End game
5. If wrong:
   - Show LearningScreen
   - Collect new character info
   - Update database

### Learning New Characters
1. User provides character name and category
2. Optionally provides distinguishing question
3. Frontend → POST /api/submit-new-character
4. Backend creates new character with all answers
5. Adds new question if provided
6. Character available for future games

## Algorithms Deep Dive

### Information Gain Calculation

**Entropy Formula**:
```
H(S) = -Σ p(x) * log₂(p(x))
```

**Information Gain**:
```
IG(S, Q) = H(S) - Σ (|Sv| / |S|) * H(Sv)

Where:
- S = current set of characters
- Q = question being evaluated
- Sv = subset of characters for answer v
```

**Example**:
```
Current characters: [Iron Man, Batman, Harry Potter]
Current probabilities: [0.4, 0.35, 0.25]
Current entropy: 1.56

Question: "Is your character a superhero?"

If Yes: [Iron Man, Batman] → Entropy: 0.99
If No: [Harry Potter] → Entropy: 0

Expected entropy: (2/3 * 0.99) + (1/3 * 0) = 0.66
Information Gain: 1.56 - 0.66 = 0.90
```

### Probability Update

**Scoring Process**:
1. For each character:
   - Compare user answers with character profile
   - Calculate compatibility score
   - Apply bonuses/penalties
2. Convert scores to probabilities using softmax
3. Normalize to sum to 1.0

**Example**:
```
User answers: [Real=No, Movie=Yes, Superhero=Yes]

Iron Man profile: [Real=No, Movie=Yes, Superhero=Yes]
Score: 2 + 2 + 2 = 6

Batman profile: [Real=No, Movie=Yes, Superhero=Yes]
Score: 2 + 2 + 2 = 6

Harry Potter profile: [Real=No, Movie=Yes, Superhero=No]
Score: 2 + 2 - 2 = 2

Probabilities:
Iron Man: exp(6) / (exp(6) + exp(6) + exp(2)) = 0.46
Batman: 0.46
Harry Potter: 0.08
```

## Performance Optimization

### Caching
- Session data stored in memory (Map)
- Database queries minimized
- Character data loaded once per session

### Scalability
- Stateless API design
- Horizontal scaling possible
- Session cleanup prevents memory leaks

### Database Indexing
```javascript
// Recommended indexes
Questions: { text: 1 }
Characters: { name: 1, category: 1 }
GameLogs: { sessionId: 1, timestamp: -1 }
```

## Security Considerations

1. **Input Validation**: All user inputs sanitized
2. **Rate Limiting**: Prevent abuse (recommended)
3. **CORS**: Configured for specific origins
4. **Environment Variables**: Sensitive data in .env
5. **MongoDB**: Use authentication in production

## Deployment Architecture

### Development
```
localhost:3000 (React Dev Server)
    ↓
localhost:5000 (Express API)
    ↓
localhost:27017 (MongoDB)
```

### Production (Docker)
```
nginx:80 (Frontend)
    ↓
backend:5000 (API)
    ↓
mongodb:27017 (Database)
```

### Cloud (AWS)
```
CloudFront (CDN)
    ↓
S3 (Static Frontend) / Vercel
    ↓
ALB (Load Balancer)
    ↓
EC2 Instances (Backend)
    ↓
MongoDB Atlas (Database)
```

## Monitoring & Analytics

### Metrics to Track
- Average questions per game
- Success rate
- Popular characters
- Response times
- Error rates

### Logging
- Game outcomes
- New characters learned
- API errors
- Performance metrics

## Future Enhancements

1. **Machine Learning**: Neural network for better predictions
2. **Multi-language**: Support multiple languages
3. **Image Recognition**: Visual character selection
4. **Voice Interface**: Speech-to-text integration
5. **Social Features**: Leaderboards, sharing
6. **Advanced Analytics**: Character popularity, trends
7. **Mobile App**: React Native version
8. **Real-time**: WebSocket for live updates

## Conclusion

This architecture provides a scalable, maintainable, and intelligent character guessing system. The modular design allows for easy enhancements and the AI algorithms ensure high accuracy while continuously learning from user interactions.
