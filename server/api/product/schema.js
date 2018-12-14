const schema = {
  //   $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Product',
  description: 'Product detail',
  type: 'object',
  properties: {
    id: {
      description: 'The unique identifier for a entity',
      type: 'string'
    },
    name: {
      description: 'Name of product',
      type: 'string',
      pattern: "^[a-zA-Z0-9']+$"
    },
    price: {
      description: 'Price',
      type: 'integer'
    },
    quantity: {
      description: 'Quantity',
      type: 'integer'
    }
  },
  required: ['name'],
  errorMessages: {}
};

module.exports = { schema };
