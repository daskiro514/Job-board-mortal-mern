/**
 * Route to handle job status
 * Created at 2021/09/18
 * Created by Ilia L
 */
const express = require('express')
const router = express.Router()
const jobStatusCtrl = require('../../controllers/jobStatusCtrl')

router.post('/create', jobStatusCtrl.create)
router.get('/getAll', jobStatusCtrl.getAll)
router.put('/rename/:_id', jobStatusCtrl.rename)
router.delete('/delete/:_id', jobStatusCtrl.delete)
router.put('/changeJobs', jobStatusCtrl.changeJobs)

module.exports = router
