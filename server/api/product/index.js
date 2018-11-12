const apiHelper = require('../api.helper');
const { authenticate, router } = apiHelper;
var entityName = 'product';

router.post('/product', (req, res) => {
  var data = apiHelper.readData(req, res, entityName);
  if (!data) { return; }
  apiHelper.saveDoc(res, entityName, data);
});

router.get('/product', (req, res) => {
  return apiHelper.getByList(req, res, entityName);
});

router.get('/product/:id', (req, res) => {
  return apiHelper.getById(req, res, entityName);
});

router.delete('/product/:id', (req, res) => {
  return apiHelper.deleteById(req, res, entityName);
});

router.patch('/product/:id', (req, res) => {
  var data = apiHelper.readPatchData(req, res, entityName);
  if (!data) { return; }
  const patchData = data.patchData;
  patchData.updatedAt = new Date().getTime();
  apiHelper.patchDoc(res, entityName, data);
});

module.exports = router;