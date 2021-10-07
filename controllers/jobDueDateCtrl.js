/**
 * The controller to handle the due date collections
 * Created at 2021/09/2
 * Created by Ilia L
 */
const mongoose = require('mongoose')
const JobDueDate = require('../models/JobDueDate')
const Job = require('../models/Job')

/**
 * Create a new due date
 */
exports.create = (req, res) => {
  new JobDueDate(req.body)
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send('Server Error')
    })
}

/**
 * Get all due date columns
 */
exports.getAll = (req, res) => {
  JobDueDate.find()
    .populate({
      path: 'jobs',
      populate: [{ path: 'dueDate' }, { path: 'user' }],
    })
    .then((results) => {
      res.json(results)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

/**
 * Change the order of the jobs
 */
exports.changeJobs = async (req, res) => {
  const { columns, job } = req.body
  let newJobIds = []
  for (let i = 0; i < columns.length; i++) {
    newJobIds = [...columns[i].jobs.map((item) => item._id)]
    await JobDueDate.findByIdAndUpdate(columns[i]._id, { jobs: newJobIds })
  }
  if (job) {
    const { _id, dueDate } = job
    await Job.findByIdAndUpdate(_id, {
      dueDate: mongoose.Types.ObjectId(dueDate),
    })
  }
  await JobDueDate.find()
    .populate({
      path: 'jobs',
      populate: [{ path: 'dueDate' }, { path: 'user' }],
    })
    .then((results) => {
      res.json(results)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

//  Rename a job due date
exports.rename = (req, res) => {
  const { _id } = req.params
  const { name } = req.body
  JobDueDate.findByIdAndUpdate(_id, { name: name })
    .populate({
      path: 'jobs',
      populate: [{ path: 'dueDate' }, { path: 'user' }],
    })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

// //  Delete a job due date
// exports.delete = (req, res) => {
//   const { _id } = req.params
//   JobDueDate.findByIdAndDelete(_id)
//     .then(async (result) => {
//       const { jobs } = result
//       for (let i = 0; i < jobs.length; i++) {
//         await Job.findByIdAndUpdate(jobs[i], { $unset: { dueDate: 1 } })
//       }
//       await res.status(200).send('OK')
//     })
//     .catch((error) => {
//       res.status(500).send('Server Error')
//     })
// }
