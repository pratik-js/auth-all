const { ObjectID } = require('mongodb');
const { getCollection } = require('./connect');

const mdbHelper = {
  list: async (entityName, { filter = {}, page = 0, limit = 10 }, res) => {
    const collection = getCollection(entityName);
    try {
      const dbRes = await collection
        .find(filter)
        .limit(limit)
        .toArray();

      sendResponse(res, dbRes);
    } catch (err) {
      console.error(err.stack);
    }
  },
  insert: async (entityName, data, res) => {
    const collection = getCollection(entityName);
    try {
      // Insert a single document
      const dbRes = await collection.insertOne(data);
      sendResponse(res, { inserted: dbRes.insertedCount });
    } catch (err) {
      console.error(err.stack);
    }
  },
  insertMany: async (entityName, data, res) => {
    const collection = getCollection(entityName);
    try {
      // Insert multiple documents
      const dbRes = await collection.insertMany(data); // [{ a: 2 }, { a: 3 }]
      sendResponse(res, dbRes);
    } catch (err) {
      console.error(err.stack);
    }
  },
  update: async (entityName, id, patchData, res) => {
    const collection = getCollection(entityName);
    try {
      const dbRes = await collection.updateOne(
        { _id: get_id(id) },
        { $set: patchData }
      ); // {a:1}, {$set: {b: 1}}
      sendResponse(res, { updated: dbRes.modifiedCount });
    } catch (err) {
      console.error(err.stack);
    }
  },
  getById: async (entityName, id, res) => {
    try {
      const collection = getCollection(entityName);
      const dbRes = await collection.findOne({ _id: get_id(id) });
      sendResponse(res, dbRes);
    } catch (err) {
      console.error(err.stack);
    }
  },
  deleteById: async (entityName, id, res) => {
    const collection = getCollection(entityName);
    try {
      const dbRes = await collection.deleteOne({ _id: get_id(id) });
      sendResponse(res, { deleted: dbRes.deletedCount });
      // sendResponse(res, dbRes);
    } catch (err) {
      console.error(err.stack);
    }
  }
};

function validateMdbId(id) {
  if (id && ObjectID.isValid(id)) {
    return id;
  }
}

function sendResponse(res, resData) {
  if (res) {
    res.send(resData || { done: true });
  }
}

function get_id(id) {
  if (validateMdbId(id)) {
    return new ObjectID(id);
  }
}

module.exports = { validateMdbId, mdbHelper };
