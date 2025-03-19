// In connect.cjs
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({path: "./config.env"});
const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database;

module.exports = {
  connectToServer: async () => {
    try {
      await client.connect();
      console.log("Connected to MongoDB successfully");

      database = client.db("assignment-4");

      return database;
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);

      throw err;
    }
  },

  getDb: () => {
    if (!database) {
      throw new Error("Database not initialized. Call connectToServer first.");
    }
    return database;
  },

  getClient: () => {
    return client;
  }
};