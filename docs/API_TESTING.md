# API Testing Guide

This document provides examples for testing the Akinator AI API endpoints.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Endpoints

### 1. Start Game

**Endpoint**: `POST /start-game`

**Request**:
```bash
curl -X POST http://localhost:5000/api/start-game \
  -H "Content-Type: application/json" \
  -d '{"category": "all"}'
```

**Response**:
```json
{
  "success": true,
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Game started successfully"
}
```

**Categories**: `all`, `movies`, `anime`, `sports`, `tech`, `indian`, `music`, `historical`, `other`

---

### 2. Answer Question

**Endpoint**: `POST /answer-question`

**Request**:
```bash
curl -X POST http://localhost:5000/api/answer-question \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "questionId": "507f1f77bcf86cd799439011",
    "answer": "yes"
  }'
```

**Response (Next Question)**:
```json
{
  "success": true,
  "shouldGuess": false,
  "question": {
    "id": "507f1f77bcf86cd799439012",
    "text": "Is your character from a movie?"
  },
  "progress": 25
}
```

**Response (Ready to Guess)**:
```json
{
  "success": true,
  "shouldGuess": true,
  "guess": {
    "characterId": "507f1f77bcf86cd799439013",
    "characterName": "Iron Man",
    "confidence": 0.87,
    "alternatives": [
      {
        "characterId": "507f1f77bcf86cd799439014",
        "characterName": "Batman",
        "confidence": 0.65
      }
    ]
  }
}
```

**Valid Answers**: `yes`, `no`, `probably`, `probably_not`, `dont_know`

---

### 3. Submit Feedback

**Endpoint**: `POST /submit-feedback`

**Request (Correct Guess)**:
```bash
curl -X POST http://localhost:5000/api/submit-feedback \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "guessedCharacterId": "507f1f77bcf86cd799439013",
    "correct": true
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you for playing!"
}
```

**Request (Wrong Guess)**:
```bash
curl -X POST http://localhost:5000/api/submit-feedback \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "guessedCharacterId": "507f1f77bcf86cd799439013",
    "correct": false
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "Let me learn from this",
  "requiresLearning": true
}
```

---

### 4. Submit New Character

**Endpoint**: `POST /submit-new-character`

**Request**:
```bash
curl -X POST http://localhost:5000/api/submit-new-character \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "characterName": "Doctor Strange",
    "category": "movies",
    "distinguishingQuestion": "Does your character use magic?",
    "distinguishingAnswer": "yes"
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "Character learned successfully!",
  "characterId": "507f1f77bcf86cd799439015"
}
```

---

### 5. Get Stats

**Endpoint**: `GET /stats`

**Request**:
```bash
curl http://localhost:5000/api/stats
```

**Response**:
```json
{
  "success": true,
  "stats": {
    "totalGames": 150,
    "successfulGames": 128,
    "successRate": "85.33"
  }
}
```

---

## Complete Game Flow Example

### Step 1: Start Game
```bash
SESSION_ID=$(curl -s -X POST http://localhost:5000/api/start-game \
  -H "Content-Type: application/json" \
  -d '{"category": "movies"}' | jq -r '.sessionId')

echo "Session ID: $SESSION_ID"
```

### Step 2: Get First Question
```bash
RESPONSE=$(curl -s -X POST http://localhost:5000/api/answer-question \
  -H "Content-Type: application/json" \
  -d "{
    \"sessionId\": \"$SESSION_ID\",
    \"questionId\": \"init\",
    \"answer\": \"init\"
  }")

QUESTION_ID=$(echo $RESPONSE | jq -r '.question.id')
QUESTION_TEXT=$(echo $RESPONSE | jq -r '.question.text')

echo "Question: $QUESTION_TEXT"
```

### Step 3: Answer Questions
```bash
# Answer: Yes
RESPONSE=$(curl -s -X POST http://localhost:5000/api/answer-question \
  -H "Content-Type: application/json" \
  -d "{
    \"sessionId\": \"$SESSION_ID\",
    \"questionId\": \"$QUESTION_ID\",
    \"answer\": \"yes\"
  }")

# Check if ready to guess
SHOULD_GUESS=$(echo $RESPONSE | jq -r '.shouldGuess')

if [ "$SHOULD_GUESS" = "true" ]; then
  CHARACTER=$(echo $RESPONSE | jq -r '.guess.characterName')
  echo "AI Guessed: $CHARACTER"
else
  QUESTION_TEXT=$(echo $RESPONSE | jq -r '.question.text')
  echo "Next Question: $QUESTION_TEXT"
fi
```

### Step 4: Submit Feedback
```bash
CHARACTER_ID=$(echo $RESPONSE | jq -r '.guess.characterId')

curl -X POST http://localhost:5000/api/submit-feedback \
  -H "Content-Type: application/json" \
  -d "{
    \"sessionId\": \"$SESSION_ID\",
    \"guessedCharacterId\": \"$CHARACTER_ID\",
    \"correct\": true
  }"
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Session not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Testing with Postman

### Import Collection

1. Create new collection "Akinator AI"
2. Add environment variables:
   - `base_url`: `http://localhost:5000/api`
   - `session_id`: (will be set automatically)

### Test Sequence

1. **Start Game**
   - Method: POST
   - URL: `{{base_url}}/start-game`
   - Body: `{"category": "all"}`
   - Test Script:
     ```javascript
     pm.environment.set("session_id", pm.response.json().sessionId);
     ```

2. **Answer Question**
   - Method: POST
   - URL: `{{base_url}}/answer-question`
   - Body:
     ```json
     {
       "sessionId": "{{session_id}}",
       "questionId": "{{question_id}}",
       "answer": "yes"
     }
     ```

3. Continue testing other endpoints...

---

## Load Testing

### Using Apache Bench
```bash
# Test start-game endpoint
ab -n 1000 -c 10 -p start-game.json -T application/json \
  http://localhost:5000/api/start-game
```

### Using Artillery
```yaml
# artillery.yml
config:
  target: "http://localhost:5000"
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "Complete Game Flow"
    flow:
      - post:
          url: "/api/start-game"
          json:
            category: "all"
          capture:
            - json: "$.sessionId"
              as: "sessionId"
```

Run:
```bash
artillery run artillery.yml
```

---

## Integration Testing

### Jest Example
```javascript
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

describe('Akinator API', () => {
  let sessionId;

  test('Start game', async () => {
    const response = await axios.post(`${API_URL}/start-game`, {
      category: 'all'
    });
    
    expect(response.data.success).toBe(true);
    expect(response.data.sessionId).toBeDefined();
    sessionId = response.data.sessionId;
  });

  test('Answer question', async () => {
    const response = await axios.post(`${API_URL}/answer-question`, {
      sessionId,
      questionId: 'test-id',
      answer: 'yes'
    });
    
    expect(response.data.success).toBe(true);
  });
});
```

---

## Monitoring API Health

### Health Check
```bash
curl http://localhost:5000/health
```

**Response**:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Monitor Response Times
```bash
# Using curl with timing
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:5000/api/stats
```

**curl-format.txt**:
```
time_namelookup:  %{time_namelookup}\n
time_connect:  %{time_connect}\n
time_appconnect:  %{time_appconnect}\n
time_pretransfer:  %{time_pretransfer}\n
time_redirect:  %{time_redirect}\n
time_starttransfer:  %{time_starttransfer}\n
----------\n
time_total:  %{time_total}\n
```

---

## Best Practices

1. **Always validate session IDs** before making requests
2. **Handle errors gracefully** in your client application
3. **Implement retry logic** for failed requests
4. **Use timeouts** to prevent hanging requests
5. **Cache responses** when appropriate
6. **Monitor API usage** and performance

---

## Support

For API issues:
- GitHub Issues: https://github.com/yourusername/akinator-ai/issues
- API Documentation: https://github.com/yourusername/akinator-ai/docs
