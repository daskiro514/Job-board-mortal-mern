const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const announcementCtrl = require('../../controllers/announcementCtrl');

router.post('/create', auth, upload.single('featuredImage'),  announcementCtrl.create);
router.get('/all', announcementCtrl.getAll);

module.exports = router;
