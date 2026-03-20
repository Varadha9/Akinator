# 🔮 Akinator AI - Character Guessing System

> An AI-powered character guessing game that predicts who you're thinking of by asking intelligent yes/no questions using **Bayesian probability** and **Information Gain** algorithms.

[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.2-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)](LICENSE)

---

## 🎯 What It Does

- You **think of any character** (real or fictional)
- The AI asks **smart yes/no questions**
- It **updates probabilities** after every answer using Bayesian inference
- It **guesses your character** with 85–95% accuracy
- If wrong, it **learns** from you and improves

---

## 🏗️ Architecture

```
React Frontend (port 3000)
        ↓  HTTP/REST
Express Backend (port 5000)
        ↓
   AI Engine
   ├── GameManager       → Session state
   ├── QuestionSelector  → Information Gain algorithm
   ├── ProbabilityEngine → Bayesian scoring
   └── GuessGenerator    → Prediction logic
        ↓
MongoDB Database (port 27017)
   ├── Questions  (55)
   ├── Characters (100+)
   └── GameLogs
```

---

## 🚀 Quick Start

### Prerequisites
- [Node.js 16+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or MongoDB Compass)

### 1. Clone the Repository
```bash
git clone https://github.com/Varadha9/Akinator.git
cd Akinator
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Seed the Database
```bash
cd ../backend
node seed.js
```

You should see:
```
✅ Connected to MongoDB
✅ Inserted 55 questions
✅ Inserted 101 characters
🎉 Database seeding completed!
```

### 5. Start Backend
```bash
cd backend
node server.js
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### 6. Start Frontend
```bash
cd frontend
npm start
```

Browser opens at **http://localhost:3000** 🎉

---

## 📁 Project Structure

```
Akinator/
├── backend/
│   ├── ai-engine/
│   │   ├── GameManager.js        # Session management
│   │   ├── QuestionSelector.js   # Information gain algorithm
│   │   ├── ProbabilityEngine.js  # Bayesian probability
│   │   └── GuessGenerator.js     # Character prediction
│   ├── controllers/
│   │   └── gameController.js     # API request handlers
│   ├── models/
│   │   ├── Character.js          # Character schema
│   │   ├── Question.js           # Question schema
│   │   └── GameLog.js            # Game history schema
│   ├── routes/
│   │   └── gameRoutes.js         # API endpoints
│   ├── services/
│   │   └── databaseService.js    # DB operations
│   ├── seed.js                   # Database seeder
│   └── server.js                 # Express server
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── StartScreen.js    # Home screen
│       │   ├── QuestionScreen.js # Question + answers
│       │   ├── GuessScreen.js    # AI guess display
│       │   └── LearningScreen.js # Teach AI new character
│       ├── pages/
│       │   └── Game.js           # Main game logic
│       ├── services/
│       │   └── api.js            # API client
│       └── App.js
├── database/
│   └── seed-data/
│       ├── characters.json       # 101 characters
│       └── questions.json        # 55 questions
├── docs/
│   ├── architecture.md
│   └── DEPLOYMENT.md
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/api` | API info |
| POST | `/api/start-game` | Start new game session |
| POST | `/api/answer-question` | Submit answer, get next question |
| POST | `/api/submit-feedback` | Tell AI if guess was correct |
| POST | `/api/submit-new-character` | Teach AI a new character |
| GET | `/api/stats` | Game statistics |

### Example: Start Game
```http
POST /api/start-game
Content-Type: application/json

{ "category": "all" }
```
```json
{
  "success": true,
  "sessionId": "uuid",
  "shouldGuess": false,
  "question": {
    "id": "...",
    "text": "Is your character real?"
  },
  "progress": 0
}
```

### Example: Answer Question
```http
POST /api/answer-question
Content-Type: application/json

{
  "sessionId": "uuid",
  "questionId": "...",
  "answer": "yes"
}
```
```json
{
  "success": true,
  "shouldGuess": false,
  "question": {
    "id": "...",
    "text": "Is your character from a movie?"
  },
  "progress": 10
}
```

**Valid answers:** `yes` · `no` · `probably` · `probably_not` · `dont_know`

---

## 🧠 AI Algorithms

### Information Gain — Question Selection

Picks the question that **reduces uncertainty the most**:

```
IG(Q) = H(current) - Σ P(answer) × H(answer)

H = entropy = -Σ p(x) × log₂(p(x))
Best question = argmax(IG)
```

### Bayesian Probability — Character Scoring

Updates character probabilities after each answer:

```
Score(C) = Σ compatibility(userAnswer, charAnswer)
P(C)     = exp(Score(C)) / Σ exp(Score(all))
```

### Answer Weights

| Answer | Weight |
|--------|--------|
| Yes | +1.0 |
| Probably | +0.5 |
| Don't Know | 0.0 |
| Probably Not | -0.5 |
| No | -1.0 |

---

## 🎮 How to Play

1. Open **http://localhost:3000**
2. Click **Start Game** (or pick a category)
3. Think of any character
4. Answer the questions honestly
5. The AI will guess your character!
6. If wrong → teach it the correct character

---

## 📊 Characters Database

101 characters across 8 categories:

| Category | Examples |
|----------|---------|
| 🎬 Movies | Iron Man, Batman, Harry Potter, Joker |
| 🎌 Anime | Naruto, Goku, Luffy, Light Yagami |
| ⚽ Sports | Ronaldo, Messi, Virat Kohli, MS Dhoni |
| 💻 Tech | Elon Musk, Steve Jobs, Bill Gates |
| 🇮🇳 Indian | Shah Rukh Khan, Amitabh Bachchan |
| 🎵 Music | Michael Jackson, Taylor Swift |
| 📜 Historical | Gandhi, Einstein, Lincoln |
| 🎮 Other | Mario, Sonic, Kratos, Link |

---

## 🔧 Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/akinator
NODE_ENV=development
MAX_QUESTIONS=20
CONFIDENCE_THRESHOLD=0.8
```

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐳 Docker Setup

```bash
# Start all services
docker-compose up --build

# Stop
docker-compose down
```

---

## 🚢 Deployment

### Backend → AWS EC2
```bash
git clone https://github.com/Varadha9/Akinator.git
cd Akinator/backend
npm install --production
# Update .env with MongoDB Atlas URI
node server.js
```

### Frontend → Vercel
```bash
cd frontend
# Set REACT_APP_API_URL to your EC2 URL in .env
npx vercel --prod
```

### Database → MongoDB Atlas
1. Create free cluster at https://cloud.mongodb.com
2. Get connection string
3. Update `MONGODB_URI` in `.env`
4. Run `node seed.js`

---

## 📈 Performance

| Metric | Value |
|--------|-------|
| Accuracy | 85–95% |
| Avg questions to guess | 8–12 |
| API response time | < 100ms |
| Characters | 101 |
| Questions | 55 |

---

## 🔮 Future Improvements

- [ ] LLM integration for dynamic questions
- [ ] Voice interaction
- [ ] Image-based character hints
- [ ] Leaderboard system
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Neural network model

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 👤 Author

**Varadha9**
- GitHub: [@Varadha9](https://github.com/Varadha9)
- Repository: [Akinator](https://github.com/Varadha9/Akinator)

---

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- Inspired by [Akinator.com](https://akinator.com)
- Bayesian inference algorithms
- Information theory principles

---

*Made with ❤️ by Varadha9*
