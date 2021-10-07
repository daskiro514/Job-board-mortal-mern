/**
 * Route to handle job categories
 * Created at 2021/09/18
 * Created by Ilia L
 */
const express = require('express')
const router = express.Router()
const jobCategoryCtrl = require('../../controllers/jobCategoryCtrl')

router.post('/create', jobCategoryCtrl.create)
router.get('/getAll', jobCategoryCtrl.getAll)
router.put('/rename/:_id', jobCategoryCtrl.rename)
router.delete('/delete/:_id', jobCategoryCtrl.delete)
router.put('/changeJobs', jobCategoryCtrl.changeJobs)

module.exports = router
