const fs = require('fs');
const getSchema = require('express').Router();
var path = require('path');

getSchema.get('/schema/:entityName', (req, res) => {
  const entityName = req.params.entityName;
  const filePath = './' + entityName + '/schema';
  try {
    res.send({ schema: require(filePath).schema });
  } catch (error) {
    res.status(404).send({ error: entityName + ' not found' });
  }
});

module.exports = getSchema;
