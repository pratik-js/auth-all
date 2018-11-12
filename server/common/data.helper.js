const pick = require('lodash.pick');

var Ajv = require('ajv');
var ajv = new Ajv({ allErrors: true, useDefaults: true }); // options can be passed, e.g. {allErrors: true}
var ajvPatch = new Ajv({ allErrors: true });

function getSchema(entityName) {
  return require('../api/' + entityName + '/schema').schema;
}

module.exports = {
  // authenticate: require('../middleware/authenticate').authenticate,
  readData: (req, res, entityName) => {
    var jsonSchema = getSchema(entityName);
    delete jsonSchema.properties.id;
    var fieldToRead = Object.keys(jsonSchema.properties);
    var data = pick(req.body, fieldToRead);
    try {
      var validate = ajv.compile(jsonSchema);
      data || res.status(500).send('no data sent');
      if (validate(data)) {
        return data;
      } else {
        res.status(400).send(validate.errors);
      }
    } catch (error) {
      console.log(error);
    }
  },
  readPatchData: (req, res, entityName) => {
    var jsonSchema = getSchema(entityName);
    const id = validateMongoId(req, res);
    if (!id) {
      return null;
    }
    delete jsonSchema.properties.id;
    delete jsonSchema.required;
    var fieldToRead = Object.keys(jsonSchema.properties);
    const data = _.pick(req.body, fieldToRead);

    try {
      var validate = ajvPatch.compile(jsonSchema);
      if (validate(data)) {
        return { id: id, patchData: data };
      } else {
        res.status(400).send(validate.errors);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
