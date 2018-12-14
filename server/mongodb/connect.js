const { MongoClient } = require('mongodb');
const Logger = require('mongodb').Logger;

const url = process.env.MONGODB_URI;
const dbName = 'ecom';
const client = new MongoClient(url);

// Set debug level
Logger.setLevel('debug');

async function open(entityName) {
  try {
    if (!client.isConnected) {
      await client.connect();
    }
    console.log('Connected correctly to server');
    const db = client.db(dbName);
    return entityName ? db.collection(entityName) : db;
  } catch (err) {
    console.error('MongoClient connection Error------------');
    console.error(err.stack);
    console.error('MongoClient connection Error------------');
  }
}

function close() {
  client.isConnected && client.close();
}

module.exports = { open, close };
