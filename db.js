require('dotenv').config(); // Load environment variables

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Narayanan:admin@cluster0.kjju3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db;
async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db('Sunmas');
  }
  return db;
}

connectDB()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(console.dir);

module.exports = { connectDB };
