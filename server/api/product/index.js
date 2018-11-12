const dataHelper = require('../../common/data.helper');
const { mongodbHelper } = require('../../common/mongodb.helper');
const { router } = require('../../common/');
var entityName = 'product';

router.post('/product', (req, res) => {
  console.log('product');
  var data = dataHelper.readData(req, res, entityName);
  if (!data) {
    return;
  }
  console.log(data);
  mongodbHelper.insert(entityName, data, res);
  // dataHelper.saveDoc(res, entityName, data);
});

router.get('/product', (req, res) => {
  return dataHelper.getByList(req, res, entityName);
});

router.get('/product/:id', (req, res) => {
  return dataHelper.getById(req, res, entityName);
});

router.delete('/product/:id', (req, res) => {
  return dataHelper.deleteById(req, res, entityName);
});

router.patch('/product/:id', (req, res) => {
  var data = dataHelper.readPatchData(req, res, entityName);
  if (!data) {
    return;
  }
  const patchData = data.patchData;
  patchData.updatedAt = new Date().getTime();
  dataHelper.patchDoc(res, entityName, data);
});

module.exports = router;
