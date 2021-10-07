/**
 * DueDate schema
 * Created at 2021/09/22
 * Created by Ilia L
 */
const mongoose = require('mongoose')

const JobDueDateSchema = new mongoose.Schema(
  {
    name: {
      type: Date,
      default: Date.now,
      required: true,
      unique: true,
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs',
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('job_due_dates', JobDueDateSchema)
