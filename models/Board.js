/**
 * Board schema
 * Created at 2021/09/19
 * Created by Ilia L
 */
const mongoose = require('mongoose')

const BoardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: '',
      required: true,
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('boards', BoardSchema)
