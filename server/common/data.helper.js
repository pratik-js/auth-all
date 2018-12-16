const pick = require('lodash.pick');

var Ajv = require('ajv');
var ajv = new Ajv({ allErrors: true, useDefaults: true }); // options can be passed, e.g. {allErrors: true}
var ajvPatch = new Ajv({ allErrors: true });

function getSchema(entityName) {
  return require('../api/' + entityName + '/schema').schema;
}

module.exports = {
  readNewData: (entityName, req, res) => {
    var jsonSchema = getSchema(entityName);
    delete jsonSchema.properties.id;
    var fieldToRead = Object.keys(jsonSchema.properties);
    var data = pick(req.body, fieldToRead);
    data || res.status(400).send({ error: 'No data sent' });
    try {
      var validate = ajv.compile(jsonSchema);
      if (validate(data)) {
        return data;
      } else {
        res.status(400).send(validate.errors);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('validation function broke');
    }
  },
  readPatchData: (entityName, req, res) => {
    const jsonSchema = getSchema(entityName);
    const fieldToRead = Object.keys(jsonSchema.properties); // get all field name from schema e.g [name, age, country]
    const patchData = pick(req.body, fieldToRead); // read data from request e.g {name: 'abc', age: 20}
    const patchDataKey = Object.keys(patchData); // get all field name which sent in request e.g [name, age]

    // update json schema for validate only patch data. e.g remove other field rules
    jsonSchema.properties = pick(jsonSchema.properties, patchDataKey);
    jsonSchema.required = patchDataKey.filter(fieldName =>
      jsonSchema.required.includes(fieldName)
    );

    try {
      var validate = ajvPatch.compile(jsonSchema);
      if (validate(patchData)) {
        return patchData;
      } else {
        res.status(400).send(validate.errors);
      }
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: 'validation api exception' });
    }
  }
};
