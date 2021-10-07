const express = require('express');
const router = express.Router();
const userGroupCtrl = require('../../controllers/userGroupCtrl');

router.post('/create', userGroupCtrl.create);
router.get('/all', userGroupCtrl.getAll);

module.exports = router;