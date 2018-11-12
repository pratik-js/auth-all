const { ObjectID, MongoClient } = require('mongodb');
assert = require('assert');
const url = process.env.MONGODB_URI;
const dbName = 'ecom';

function validateMongoId(req, res) {
  var id = req.params.id;
  if (id && !ObjectID.isValid(id)) {
    res.status(500).send();
    return null;
  }
  return id;
}

async function connect(client) {
  try {
    console.log('trying to connect mongodb on -----------' + url);
    await client.connect();
  } catch (err) {
    console.log('connection error------------');
    console.log(err.stack);
  }
}

const mongodbHelper = {
  insert: async (entityName, data, res) => {
    const client = new MongoClient(url);
    await connect(client);
    console.log('Connected correctly to server');
    const db = client.db(dbName);

    try {
      // let songs = db.collection('songs')
      // Insert a single document
      await db.createCollection('customers');
      console.log('insert');
      let r = await db.collection('customers').insertOne({ a: 1 });
      console.log(r.insertedCount);

      // Insert multiple documents
      r = await db.collection('customers').insertMany([{ a: 2 }, { a: 3 }]);
      console.log(r.insertedCount);
      console.log('inserted');
    } catch (err) {
      console.log(err.stack);
    }

    // Close connection
    client.close();
    res.send('super');
  }
};
module.exports = { validateMongoId, mongodbHelper };
