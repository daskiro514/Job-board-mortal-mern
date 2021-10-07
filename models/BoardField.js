/**
 * The schema of the field of the board(i.e. 'not started', 'in progress', etc.)
 * Created at 2021/09/17
 * Created by Ilia L
 */
const mongoose = require('mongoose')

const BoardFieldSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
    },
    jobType: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('board_fields', BoardFieldSchema)
