const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const authCtrl = require('../../controllers/authCtrl');

router.post('/signup', authCtrl.signup);
router.post('/signin', authCtrl.signin);
router.get('/access-token', auth, authCtrl.signinWithToken);

module.exports = router;
