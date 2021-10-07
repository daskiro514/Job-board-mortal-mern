/**
 * Route to handle jobs
 * Created at 2021/09/15
 * Created by Ilia L
 */
const express = require('express')
const router = express.Router()
const jobCtrl = require('../../controllers/jobCtrl')

router.post('/create', jobCtrl.create)
router.get('/getAll', jobCtrl.getAll)
router.get('/getByUser/:userId', jobCtrl.getByUser)
router.post('/getByJobTypeAndUserId', jobCtrl.getByJobTypeAndUserId)
router.get('/getByJobType/:jobType', jobCtrl.getByJobType)
router.put('/changeStatus/:_id', jobCtrl.changeStatus)
router.put('/changeCategory/:_id', jobCtrl.changeCategory)
router.put('/changeDueDate/:_id', jobCtrl.changeDueDate)
router.put('/changeUser/:_id', jobCtrl.changeUser)
router.get(
  '/getAllBoardColumnsExceptDueDate',
  jobCtrl.getAllBoardColumnsExceptDueDate,
)
router.put('/update/:_id', jobCtrl.update)
router.put('/delete/:_id', jobCtrl.delete)

module.exports = router
