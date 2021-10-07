/**
 * The controller to handle the 'board_fields' collection
 * Created at 2021/09/17
 * Created by Ilia L
 */

const BoardField = require('../models/BoardField')

//  Create a new field
exports.create = (req, res) => {
  new BoardField(req.body)
    .save()
    .then((result) => {
      console.log(result)
      res.json(result)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

//  Get the fields by job type
exports.getByJobType = (req, res) => {
  const { jobType } = req.params
  BoardField.find({ jobType: jobType })
    .then((results) => {
      res.json(results)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

//  Get the fields by job type and the user id
exports.getByJobTypeAndUserId = (req, res) => {
  console.log(req.body)
}

//  Rename the board field
exports.renameBoardField = (req, res) => {
  const { _id } = req.params
  const { name } = req.body
  BoardField.findByIdAndUpdate(_id, { name: name })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

//  Delete a board field by its object id
exports.delete = (req, res) => {
  const { _id } = req.params
  BoardField.findByIdAndDelete(_id)
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}
