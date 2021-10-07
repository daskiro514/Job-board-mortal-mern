const mongoose = require('mongoose')
const Job = require('../models/Job')
const User = require('../models/User')

exports.updateProfile = (req, res) => {
  const profilePicture = req.files['profilePicture']
    ? req.files['profilePicture'][0].filename
    : req.body.profilePicture
  const profileHeader = req.files['profileHeader']
    ? req.files['profileHeader'][0].filename
    : req.body.profileHeader

  User.findByIdAndUpdate(req.params.id, {
    position: req.body.position,
    phone: req.body.phone,
    mobile: req.body.mobile,
    email: req.body.email,
    birthday: req.body.birthday,
    profilePicture: profilePicture,
    profileHeader: profileHeader,
    groups: req.body.groups.split(','),
    leftMenu: req.body.leftMenu.split(','),
    rightMenu: req.body.rightMenu.split(','),
    dashboard: req.body.dashboard.split(','),
  })
    .then((result) => {
      User.findById(req.params.id)
        .populate('groups')
        .populate('leftMenu')
        .populate('rightMenu')
        .populate('dashboard')
        .then((result2) => {
          res.json(result2)
        })
        .catch((error) => {
          res.status(500).send('Server Error!')
        })
    })
    .catch((error) => {
      res.status(500).send('Server Error!')
    })
}

/**
 * Change the order of the jobs
 * */
exports.sortJobsByOrder = (req, res) => {
  const { orderedJobs } = req.body
  const { _id } = req.params
  //  Change the order of the jobs
  User.findByIdAndUpdate(_id, { jobs: orderedJobs })
    .then((result) => {
      //  Respond the user whose the jobs have been ordered
      User.findById(_id)
        .populate('jobs')
        .then((result2) => {
          res.json(result2)
        })
        .catch((error) => {
          res.status(500).send('Server Error')
        })
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

/**
 * Get all users
 */
exports.getAll = (req, res) => {
  User.find()
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

//  Change the order of the jobs
exports.changeJobs = async (req, res) => {
  const { columns, job } = req.body
  let newJobIds = []
  for (let i = 0; i < columns.length; i++) {
    newJobIds = [...columns[i].jobs.map((item) => item._id)]
    await User.findByIdAndUpdate(columns[i]._id, { jobs: newJobIds })
  }
  if (job) {
    const { _id, user } = job
    await Job.findByIdAndUpdate(_id, {
      user: mongoose.Types.ObjectId(user),
    })
  }
  await User.find()
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
