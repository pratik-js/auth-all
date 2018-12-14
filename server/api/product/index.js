const dataHelper = require('../../common/data.helper');
const { mdbHelper } = require('../../mongodb/helper');
const { router } = require('../../common/');
var entityName = 'product';

router.post('/product', (req, res) => {
  console.log('product');
  var data = dataHelper.readData(entityName, req, res);
  if (!data) {
    return;
  }
  mdbHelper.insert(entityName, data, res);
});

router.get('/product', (req, res) => {
  let filter, page, limit;
  mdbHelper.list(entityName, { filter, page, limit }, res);
});

router.get('/product/:id', (req, res) => {
  mdbHelper.getById(entityName, id, res);
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
  mdbHelper.update(entityName, id, patchData, res);
});

module.exports = router;
