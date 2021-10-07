/**
 * The route to handle the due date
 * Created at 2021/09/22
 * Created by Ilia L
 */

const express = require('express')
const router = express.Router()
const jobDueDateCtrl = require('../../controllers/jobDueDateCtrl')

router.post('/create', jobDueDateCtrl.create)
router.get('/getAll', jobDueDateCtrl.getAll)
router.put('/changeJobs', jobDueDateCtrl.changeJobs)
router.put('/rename/:_id', jobDueDateCtrl.rename)
// router.delete('/delete/:_id', jobDueDateCtrl.delete)

module.exports = router
