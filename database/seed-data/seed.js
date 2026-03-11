require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Question = require('../../backend/models/Question');
const Character = require('../../backend/models/Character');

const questionsData = require('./questions.json');
const charactersData = require('./characters.json');

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/akinator', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Question.deleteMany({});
    await Character.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert questions
    const questions = await Question.insertMany(questionsData);
    console.log(`✅ Inserted ${questions.length} questions`);

    // Create question map for easy lookup
    const questionMap = {};
    questions.forEach(q => {
      const key = q.text.toLowerCase();
      questionMap[key] = q._id;
    });

    // Map profile attributes to question IDs and answers
    const attributeToQuestion = {
      'real': { question: 'is your character real?', yesAnswer: 'yes', noAnswer: 'no' },
      'fictional': { question: 'is your character fictional?', yesAnswer: 'yes', noAnswer: 'no' },
      'movie': { question: 'is your character from a movie?', yesAnswer: 'yes', noAnswer: 'no' },
      'anime': { question: 'is your character from an anime?', yesAnswer: 'yes', noAnswer: 'no' },
      'superhero': { question: 'is your character a superhero?', yesAnswer: 'yes', noAnswer: 'no' },
      'villain': { question: 'is your character a villain?', yesAnswer: 'yes', noAnswer: 'no' },
      'male': { question: 'is your character male?', yesAnswer: 'yes', noAnswer: 'no' },
      'female': { question: 'is your character female?', yesAnswer: 'yes', noAnswer: 'no' },
      'superpowers': { question: 'does your character have superpowers?', yesAnswer: 'yes', noAnswer: 'no' },
      'marvel': { question: 'is your character from marvel?', yesAnswer: 'yes', noAnswer: 'no' },
      'dc': { question: 'is your character from dc comics?', yesAnswer: 'yes', noAnswer: 'no' },
      'sports': { question: 'is your character a sports person?', yesAnswer: 'yes', noAnswer: 'no' },
      'tech': { question: 'is your character a tech entrepreneur?', yesAnswer: 'yes', noAnswer: 'no' },
      'india': { question: 'is your character from india?', yesAnswer: 'yes', noAnswer: 'no' },
      'historical': { question: 'is your character a historical figure?', yesAnswer: 'yes', noAnswer: 'no' },
      'alive': { question: 'is your character alive today?', yesAnswer: 'yes', noAnswer: 'no' },
      'mask': { question: 'does your character wear a mask?', yesAnswer: 'yes', noAnswer: 'no' },
      'cape': { question: 'does your character wear a cape?', yesAnswer: 'yes', noAnswer: 'no' },
      'fly': { question: 'can your character fly?', yesAnswer: 'yes', noAnswer: 'no' },
      'scientist': { question: 'is your character a scientist?', yesAnswer: 'yes', noAnswer: 'no' },
      'billionaire': { question: 'is your character a billionaire?', yesAnswer: 'yes', noAnswer: 'no' },
      'technology': { question: 'does your character use technology?', yesAnswer: 'yes', noAnswer: 'no' },
      'videogame': { question: 'is your character from a video game?', yesAnswer: 'yes', noAnswer: 'no' },
      'musician': { question: 'is your character a musician?', yesAnswer: 'yes', noAnswer: 'no' },
      'actor': { question: 'is your character an actor?', yesAnswer: 'yes', noAnswer: 'no' },
      'weapon': { question: 'does your character have a weapon?', yesAnswer: 'yes', noAnswer: 'no' },
      'japan': { question: 'is your character from japan?', yesAnswer: 'yes', noAnswer: 'no' },
      'america': { question: 'is your character from america?', yesAnswer: 'yes', noAnswer: 'no' },
      'strength': { question: 'does your character have super strength?', yesAnswer: 'yes', noAnswer: 'no' },
      'wizard': { question: 'is your character a wizard or magician?', yesAnswer: 'yes', noAnswer: 'no' },
      'armor': { question: 'does your character wear armor?', yesAnswer: 'yes', noAnswer: 'no' },
      'bald': { question: 'is your character bald?', yesAnswer: 'yes', noAnswer: 'no' },
      'longhair': { question: 'does your character have long hair?', yesAnswer: 'yes', noAnswer: 'no' },
      'leader': { question: 'is your character a leader?', yesAnswer: 'yes', noAnswer: 'no' },
      'politician': { question: 'is your character a politician?', yesAnswer: 'yes', noAnswer: 'no' },
      'oscar': { question: 'did your character win an oscar?', yesAnswer: 'yes', noAnswer: 'no' },
      'cricket': { question: 'is your character a cricket player?', yesAnswer: 'yes', noAnswer: 'no' },
      'football': { question: 'is your character a football player?', yesAnswer: 'yes', noAnswer: 'no' },
      'basketball': { question: 'is your character a basketball player?', yesAnswer: 'yes', noAnswer: 'no' },
      'book': { question: 'is your character from a book series?', yesAnswer: 'yes', noAnswer: 'no' },
      'immortal': { question: 'is your character immortal?', yesAnswer: 'yes', noAnswer: 'no' },
      'detective': { question: 'is your character a detective?', yesAnswer: 'yes', noAnswer: 'no' },
      'british': { question: 'does your character have a british accent?', yesAnswer: 'yes', noAnswer: 'no' },
      'intelligent': { question: 'is your character known for intelligence?', yesAnswer: 'yes', noAnswer: 'no' },
      '21stcentury': { question: 'is your character from the 21st century?', yesAnswer: 'yes', noAnswer: 'no' },
      'tragic': { question: 'does your character have a tragic backstory?', yesAnswer: 'yes', noAnswer: 'no' },
      'funny': { question: 'is your character known for being funny?', yesAnswer: 'yes', noAnswer: 'no' },
      'serious': { question: 'is your character known for being serious?', yesAnswer: 'yes', noAnswer: 'no' },
      'spy': { question: 'is your character a detective?', yesAnswer: 'probably', noAnswer: 'no' },
      'young': { question: 'is your character from the 21st century?', yesAnswer: 'probably', noAnswer: 'dont_know' }
    };

    // Process characters
    const charactersToInsert = charactersData.map(char => {
      const answers = [];
      
      if (char.profile) {
        Object.entries(char.profile).forEach(([attribute, value]) => {
          const mapping = attributeToQuestion[attribute];
          if (mapping) {
            const questionId = questionMap[mapping.question];
            if (questionId) {
              const answer = value === 'yes' ? mapping.yesAnswer : mapping.noAnswer;
              answers.push({ questionId, answer });
            }
          }
        });
      }

      return {
        name: char.name,
        category: char.category,
        answers
      };
    });

    const characters = await Character.insertMany(charactersToInsert);
    console.log(`✅ Inserted ${characters.length} characters`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Questions: ${questions.length}`);
    console.log(`   - Characters: ${characters.length}`);
    
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
