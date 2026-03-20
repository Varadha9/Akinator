# ✅ FIXED! Follow These Steps

## 🎯 Step-by-Step Instructions

### Step 1: Start MongoDB

Open Command Prompt and run:
```bash
mongod
```

**Keep this window open!** You should see:
```
[initandlisten] waiting for connections on port 27017
```

---

### Step 2: Seed the Database

Open a NEW Command Prompt and run:
```bash
cd d:\Akinator
seed-database.bat
```

You should see:
```
✅ Connected to MongoDB
✅ Inserted 55 questions
✅ Inserted 100 characters
🎉 Database seeding completed successfully!
```

---

### Step 3: Start Backend

In the same Command Prompt (or a new one):
```bash
cd d:\Akinator\backend
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
```

**Keep this window open!**

---

### Step 4: Start Frontend

Open ANOTHER Command Prompt:
```bash
cd d:\Akinator\frontend
npm start
```

Browser will automatically open at http://localhost:3000

---

## ✅ Verify It's Working

1. **Check Backend**: Visit http://localhost:5000/health
   - Should see: `{"status":"OK"}`

2. **Check Frontend**: Visit http://localhost:3000
   - Should see: Akinator AI start screen

3. **Test Game**:
   - Click "Start Game"
   - You should see a question
   - Click an answer
   - Next question should appear

---

## 🎮 You're Ready!

If all steps worked:
- ✅ MongoDB is running
- ✅ Database is seeded
- ✅ Backend is running
- ✅ Frontend is running
- ✅ Game is playable!

**Enjoy your AI-powered Akinator!** 🔮

---

## 🐛 Troubleshooting

### MongoDB won't start
- Install from: https://www.mongodb.com/try/download/community
- Or use Docker: `docker run -d -p 27017:27017 mongo:latest`

### Seeding fails
- Make sure MongoDB is running first
- Check the error message
- Try running: `mongod` in a separate window

### Port already in use
```bash
npx kill-port 5000
npx kill-port 3000
```

### Module not found
```bash
cd backend
npm install

cd ../frontend
npm install
```

---

## 📊 What's Running

When everything is working:

```
Terminal 1: mongod (port 27017)
Terminal 2: npm start (backend, port 5000)
Terminal 3: npm start (frontend, port 3000)
```

---

## 🛑 How to Stop

Press `Ctrl + C` in each terminal:
1. Frontend terminal
2. Backend terminal
3. MongoDB terminal

---

**All fixed! Follow the steps above to get it working!** 🚀
