/**
 * The controller to handle job status
 * Created at 2021/09/18
 * Created by Ilia L
 */
const mongoose = require('mongoose')
const Job = require('../models/Job')
const JobStatus = require('../models/JobStatus')

//  Create a job status
exports.create = async (req, res) => {
  new JobStatus(req.body)
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send('Server Error')
    })
}

//  Get all job status
exports.getAll = (req, res) => {
  JobStatus.find()
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

//  Rename a job status
exports.rename = (req, res) => {
  const { _id } = req.params
  const { name } = req.body
  JobStatus.findByIdAndUpdate(_id, { name: name })
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

//  Delete a job status
exports.delete = (req, res) => {
  const { _id } = req.params
  JobStatus.findByIdAndDelete(_id)
    .then(async (result) => {
      const { jobs } = result
      let updatedJob = null
      let resJobs = []

      for (let i = 0; i < jobs.length; i++) {
        await Job.findByIdAndUpdate(jobs[i], { $unset: { status: 1 } })
        updatedJob = await Job.findById(jobs[i])
          .populate('dueDate')
          .populate('user')
        resJobs.push(updatedJob)
      }
      await res.status(200).json(resJobs)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

//  Change the order of the jobs
exports.changeJobs = async (req, res) => {
  const { columns, job } = req.body
  let newJobIds = []
  for (let i = 0; i < columns.length; i++) {
    newJobIds = [...columns[i].jobs.map((item) => item._id)]
    await JobStatus.findByIdAndUpdate(columns[i]._id, { jobs: newJobIds })
  }
  if (job) {
    const { _id, status } = job
    await Job.findByIdAndUpdate(_id, {
      status: mongoose.Types.ObjectId(status),
    })
  }
  await JobStatus.find()
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
