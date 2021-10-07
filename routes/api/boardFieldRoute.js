/**
 * Route to handle the fields of the board
 * Created at 2021/09/17
 * Created by Ilia L
 */
const express = require('express')
const router = express.Router()
const boardFieldCtrl = require('../../controllers/boardFieldCtrl')

router.post('/create', boardFieldCtrl.create)
router.post('/getByJobTypeAndUserId', boardFieldCtrl.getByJobTypeAndUserId)
router.get('/getByJobType/:jobType', boardFieldCtrl.getByJobType)
router.put('/rename/:_id', boardFieldCtrl.renameBoardField)
router.delete('/delete/:_id', boardFieldCtrl.delete)

module.exports = router
