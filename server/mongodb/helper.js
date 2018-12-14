const { ObjectID } = require('mongodb');
const { open, close } = require('./connect');
function sendResponse(res) {
  if (res) {
    res.send(dbRes || { done: true });
  }
}
const mdbHelper = {
  getById: async (entityName, id, res) => {
    try {
      const collection = await open(entityName);
      const dbRes = await collection.findOne(id);
      close(); // Close connection
      sendResponse(res, dbRes);
    } catch (err) {
      console.error(err.stack);
    }
  },
  list: async (entityName, { filter = null, page = 0, limit = 10 }, res) => {
    try {
      const collection = await open(entityName);
      const dbRes = await collection
        .find(filter)
        .limit(limit)
        .toArray();
      close(); // Close connection
      sendResponse(res, dbRes);
    } catch (err) {
      console.error(err.stack);
    }
  },
  insert: async (entityName, data, res) => {
    try {
      // Insert a single document
      const collection = await open(entityName);
      const dbRes = await collection.insertOne(data);
      console.log(dbRes.insertedCount);
      close(); // Close connection
      sendResponse(res, dbRes);
    } catch (err) {
      console.error(err.stack);
    }
  },
  insertMany: async (entityName, data, res) => {
    try {
      const collection = await open(entityName);
      // Insert multiple documents
      const dbRes = await collection.insertMany([{ a: 2 }, { a: 3 }]);
      close(); // Close connection
      sendResponse(res, dbRes);
    } catch (err) {
      console.error(err.stack);
    }
  },
  update: async (entityName, data, res) => {
    try {
      const collection = await open(entityName);
      const dbRes = await collection.updateOne(data); // {a:1}, {$set: {b: 1}}
      close(); // Close connection
      sendResponse(res, dbRes);
    } catch (err) {
      console.error(err.stack);
    }
  },
  delete: async (entityName, data, res) => {
    try {
      const collection = await open(entityName);
      const dbRes = await collection.deleteOne(data);
      close(); // Close connection
      sendResponse(res, dbRes);
    } catch (err) {
      console.error(err.stack);
    }
  }
};

function validateMdbId(req, res) {
  var id = req.params.id;
  if (id && !ObjectID.isValid(id)) {
    res.status(500).send();
    return null;
  }
  return id;
}

module.exports = { validateMdbId, mdbHelper };
