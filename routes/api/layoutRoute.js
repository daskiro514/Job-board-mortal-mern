const express = require('express');
const router = express.Router();
const layoutCtrl = require('../../controllers/layoutCtrl');

router.post('/create', layoutCtrl.create);
router.get('/all', layoutCtrl.getAll);

module.exports = router;