/**
 * The controller to handle job categories
 * Created at 2021/09/18
 * Created by Ilia L
 */
const JobCategory = require('../models/JobCategory')
const Job = require('../models/Job')

//  Create a job category
exports.create = (req, res) => {
  new JobCategory(req.body)
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

//  Get all job categories
exports.getAll = (req, res) => {
  JobCategory.find()
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

//  Rename a job category
exports.rename = (req, res) => {
  const { _id } = req.params
  const { name } = req.body
  JobCategory.findByIdAndUpdate(_id, { name: name })
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

//  Delete a job category
exports.delete = (req, res) => {
  const { _id } = req.params
  JobCategory.findByIdAndDelete(_id)
    .then(async (result) => {
      const { jobs } = result
      let updatedJob = null
      let resJobs = []

      for (let i = 0; i < jobs.length; i++) {
        await Job.findByIdAndUpdate(jobs[i], { $pull: { categories: _id } })
        updatedJob = await Job.findById(jobs[i])
          .populate('dueDate')
          .populate('user')
        resJobs.push(updatedJob)
      }
      categories = await JobCategory.find().populate({
        path: 'jobs',
        populate: [{ path: 'dueDate' }, { path: 'user' }],
      })
      await res.status(200).json({
        jobs: resJobs,
        columns: categories,
      })
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
    await JobCategory.findByIdAndUpdate(columns[i]._id, { jobs: newJobIds })
  }
  if (job) {
    const { _id, categories } = job
    await Job.findByIdAndUpdate(_id, { categories })
  }
  await JobCategory.find()
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
