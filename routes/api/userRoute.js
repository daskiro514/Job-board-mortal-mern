const express = require('express')
const router = express.Router()
const userCtrl = require('../../controllers/userCtrl')
const auth = require('../../middleware/auth')
const upload = require('../../middleware/upload')

router.put(
  '/updateProfile/:id',
  auth,
  upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'profileHeader', maxCount: 1 },
  ]),
  userCtrl.updateProfile,
)
router.put('/changeJobs', userCtrl.changeJobs)
router.get('/getAll', userCtrl.getAll)

module.exports = router
