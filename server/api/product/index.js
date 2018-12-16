const router = require('express').Router();
const { dataHelper, mdbHelper } = require('../../common');
var entityName = 'product';

router.post('/product', (req, res) => {
  const data = dataHelper.readNewData(entityName, req, res);
  if (!data) {
    res.send({ inserted: 0 });
  }
  mdbHelper.insert(entityName, data, res);
});

router.patch('/product/:id', (req, res) => {
  const patchData = dataHelper.readPatchData(entityName, req, res);
  if (!patchData) {
    res.send({ updated: 0 });
  }
  patchData.updatedAt = new Date().getTime();
  mdbHelper.update(entityName, req.params.id, patchData, res);
});

router.get('/product', (req, res) => {
  let filter, page, limit;
  mdbHelper.list(entityName, { filter, page, limit }, res);
});

router.get('/product/:id', (req, res) => {
  mdbHelper.getById(entityName, req.params.id, res);
});

router.delete('/product/:id', (req, res) => {
  mdbHelper.deleteById(entityName, req.params.id, res);
});

module.exports = router;
