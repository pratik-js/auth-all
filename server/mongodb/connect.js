const { MongoClient } = require('mongodb');
// const Logger = require('mongodb').Logger;

let mdbObj;
// Set debug level
// Logger.setLevel('debug');

async function initMongoDB(entityName) {
  const url = process.env.MONGODB_URI;
  const dbName = 'ecom';
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    console.info('Connected correctly to server');
    mdbObj = client.db(dbName);
    return true;
  } catch (err) {
    console.error('MongoClient connection Error------------');
    console.error(err.stack);
    console.error('MongoClient connection Error------------');
  }
}

function getCollection(entityName) {
  try {
    return mdbObj.collection(entityName);
  } catch (err) {
    console.error('MongoClient collection not found');
    console.error(err.stack);
  }
}

module.exports = { initMongoDB, getCollection };
