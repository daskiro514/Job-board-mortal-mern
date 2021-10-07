const express = require('express');
const router = express.Router();
const componentCtrl = require('../../controllers/componentCtrl');

router.post('/create', componentCtrl.create);
router.get('/all', componentCtrl.getAll);

module.exports = router;