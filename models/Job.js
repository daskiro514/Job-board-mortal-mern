/**
 * Job mongodb schema
 * Created at 2021/09/15
 * Created by Ilia L
 */
const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: '',
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'job_statuses',
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job_categories',
      },
    ],
    dueDate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'job_due_dates',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('jobs', JobSchema)
