/**
 * The route to handle the boards
 * Created at 2021/09/19
 * Created by Ilia L
 */

const express = require('express')
const router = express.Router()
const boardCtrl = require('../../controllers/boardCtrl')

router.post('/create', boardCtrl.create)
router.get('/getByUserId/:userId', boardCtrl.getByUserId)
router.put('/rename/:_id', boardCtrl.rename)
router.delete('/delete/:_id', boardCtrl.delete)

module.exports = router
