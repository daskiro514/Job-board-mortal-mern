/**
 * The controller to handle boards
 * Created at 2021/09/19
 * Created by Ilia L
 */

const Board = require('../models/Board')

//  Create a new board
exports.create = (req, res) => {
  new Board(req.body)
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

//  Get the boards by the user id
exports.getByUserId = (req, res) => {
  const { userId } = req.params
  Board.find({ user: userId })
    .then((results) => {
      res.json(results)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

//  Rename the board's title
exports.rename = (req, res) => {
  const { _id } = req.params
  const { title } = req.body
  Board.findByIdAndUpdate(_id, { title: title })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

//  Delete a board
exports.delete = (req, res) => {
  const { _id } = req.params
  Board.findByIdAndDelete(_id)
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}
