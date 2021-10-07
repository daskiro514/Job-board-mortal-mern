/**
 * Job category mongodb schema
 * Created at 2021/09/18
 * Created by Ilia L
 */
const mongoose = require('mongoose')

const JobCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
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

module.exports = mongoose.model('job_categories', JobCategorySchema)
