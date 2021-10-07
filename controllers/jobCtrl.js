/**
 * The controller to handle jobs
 * Created at 2021/09/15
 * Created by Ilia L
 */

const mongoose = require('mongoose')
const Job = require('../models/Job')
const JobStatus = require('../models/JobStatus')
const JobCategory = require('../models/JobCategory')
const JobDueDate = require('../models/JobDueDate')
const User = require('../models/User')
const {
  STATUS,
  CATEGORY,
  DUE_DATE,
  USER,
} = require('../client/utils/constants')

/**
 * Create a new job
 */
exports.create = async (req, res) => {
  /*= ================ To insert data directly by postman =================== */
  // const { title, description, status, categories, dueDate, user } = req.body
  // var dueDateObj = null
  // var dueDateId = ''
  // var newJob = null

  // // Get the due date object id
  // dueDateObj = await JobDueDate.findOne({ name: dueDate })
  // if (dueDateObj) {
  //   dueDateId = dueDateObj._id
  // } else {
  //   dueDateId = (await new JobDueDate({ name: dueDate }).save())._id
  // }

  // //  Create a new job
  // newJob = await new Job({
  //   title,
  //   description,
  //   status,
  //   categories,
  //   dueDate: dueDateId,
  //   user,
  // }).save()

  // // Insert the job's object id to the 'jobs' field of each job status
  // await JobStatus.findByIdAndUpdate(status, {
  //   $push: { jobs: newJob._id },
  // })

  // // Insert the job's object id to the 'jobs' field of each job category
  // for (let i = 0; i < categories.length; i++) {
  //   await JobCategory.findByIdAndUpdate(categories[i], {
  //     $push: { jobs: newJob._id },
  //   })
  // }

  // //  Insert the job's object id to the 'jobs' filed of due date
  // await JobDueDate.findByIdAndUpdate(dueDateId, { $push: { jobs: newJob._id } })

  // //  Insert the job's object id to the 'jobs' filed of user
  // await User.findByIdAndUpdate(user, { $push: { jobs: newJob._id } })

  // //  Respond the new job
  // await getJobByIdAndResponse(newJob._id, res)
  /*= ======================================================================= */

  /*= ================== To insert data from the frontend =================== */
  new Job(req.body)
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(500).send('SERVER ERROR')
    })
  /*= ======================================================================= */
}

/**
 * Get all jobs
 */
exports.getAll = (req, res) => {
  Job.find()
    // .populate('status')
    // .populate('categories')
    .populate('user')
    .populate('dueDate')
    .then((results) => {
      res.json(results)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

/**
 * Get the jobs by the user id
 */
exports.getByUser = (req, res) => {
  const { userId } = req.params
  Job.find({ user: userId })
    .then((results) => {
      res.json(results)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

/**
 * Get the jobs by the job type and the user id
 */
exports.getByJobTypeAndUserId = (req, res) => {
  const { jobType, userId } = req.params
  Job.find({ jobType: jobType, user: userId })
    .then((results) => {
      console.log(results)
      res.json(results)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

/**
 * Get the jobs by the job type
 */
exports.getByJobType = (req, res) => {
  const { jobType } = req.params
  console.log(jobType)
  Job.find({ jobType: jobType })
    .then((results) => {
      res.json(results)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

/**
 * Change the title and the description of a job
 */
exports.update = async (req, res) => {
  const { _id } = req.params
  const { title, description, columnType } = req.body
  let job = null
  let columns = []

  job = await Job.findByIdAndUpdate(_id, { title, description })
    .populate('dueDate')
    .populate('user')

  switch (columnType) {
    case STATUS:
      columns = await JobStatus.find().populate({
        path: 'jobs',
        populate: [{ path: 'dueDate' }, { path: 'user' }],
      })
      break
    case CATEGORY:
      columns = await JobCategory.find().populate({
        path: 'jobs',
        populate: [{ path: 'dueDate' }, { path: 'user' }],
      })
      break
    case DUE_DATE:
      columns = await JobDueDate.find().populate({
        path: 'jobs',
        populate: [{ path: 'dueDate' }, { path: 'user' }],
      })
      break
    case USER:
      columns = await User.find().populate({
        path: 'jobs',
        populate: [{ path: 'dueDate' }, { path: 'user' }],
      })
      break
    default:
      break
  }
  res.status(200).json({ job, columns })
}

/**
 * Change a status of a job
 */
exports.changeStatus = (req, res) => {
  const { _id } = req.params
  const { oldStatusId, newStatusId } = req.body

  //  Find a job to change its object id
  Job.findById(_id)
    .then((result) => {
      //  Get the changed statuses
      result.statuses.splice(
        result.statuses.indexOf(oldStatusId),
        1,
        newStatusId,
      )
      //  Change its statuses
      Job.findByIdAndUpdate(_id, { statuses: result.statuses })
        .then((result2) => {
          getJobByIdAndResponse(_id, res)
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
 * Change a category of a job
 */
exports.changeCategory = (req, res) => {
  const { _id } = req.params
  const { oldCategoryId, newCategoryId } = req.body

  //  Find a job to change its object id
  Job.findById(_id)
    .then((result) => {
      //  Get the changed statuses
      result.categories.splice(
        result.categories.indexOf(oldCategoryId),
        1,
        newCategoryId,
      )
      //  Change its statuses
      Job.findByIdAndUpdate(_id, { categories: result.categories })
        .then((result2) => {
          getJobByIdAndResponse(_id, res)
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
 * Change the due date of a job
 */
exports.changeDueDate = (req, res) => {
  const { _id } = req.params
  const { newDueDate } = req.body

  //  Change the job's dueDate
  Job.findByIdAndUpdate(_id, { dueDate: newDueDate })
    .then((result) => {
      getJobByIdAndResponse(_id, res)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

/**
 * Change the assigned user of a job
 */
exports.changeUser = (req, res) => {
  const { _id } = req.params
  const { newUserId } = req.body

  //  Change the job's assigned user
  Job.findByIdAndUpdate(_id, { user: newUserId })
    .then((result) => {
      getJobByIdAndResponse(_id, res)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}

/**
 * Get all job statuses, job categories and users without populate()
 */
exports.getAllBoardColumnsExceptDueDate = async (req, res) => {
  let resData = {}
  resData.statuses = await JobStatus.find()
  resData.categories = await JobCategory.find()
  resData.users = await User.find()
  res.status(200).json(resData)
}

/**
 * Remove a job from jobpool or a board column
 */
exports.delete = async (req, res) => {
  const { _id } = req.params
  const { columnType, columnId } = req.body
  let boardColumns = []

  //  Remove from a board column
  if (columnId) {
    let job = null

    switch (columnType) {
      case STATUS:
        await Job.findByIdAndUpdate(_id, { $unset: { status: 1 } })
        await JobStatus.findByIdAndUpdate(columnId, {
          $pull: { jobs: _id },
        })
        boardColumns = await JobStatus.find().populate({
          path: 'jobs',
          populate: [{ path: 'dueDate' }, { path: 'user' }],
        })
        break
      case CATEGORY:
        await Job.findByIdAndUpdate(_id, { $pull: { categories: columnId } })
        await JobCategory.findByIdAndUpdate(columnId, {
          $pull: { jobs: _id },
        })
        boardColumns = await JobCategory.find().populate({
          path: 'jobs',
          populate: [{ path: 'dueDate' }, { path: 'user' }],
        })
        break
      case DUE_DATE:
        await Job.findByIdAndUpdate(_id, { $unset: { dueDate: 1 } })
        await JobDueDate.findByIdAndUpdate(columnId, {
          $pull: { jobs: _id },
        })
        boardColumns = await JobDueDate.find().populate({
          path: 'jobs',
          populate: [{ path: 'dueDate' }, { path: 'user' }],
        })
        break
      case USER:
        await Job.findByIdAndUpdate(_id, { $unset: { user: 1 } })
        await User.findByIdAndUpdate(columnId, {
          $pull: { jobs: _id },
        })
        boardColumns = await User.find().populate({
          path: 'jobs',
          populate: [{ path: 'dueDate' }, { path: 'user' }],
        })
        break
      default:
        break
    }
    job = await Job.findById(_id).populate('dueDate').populate('user')
    await res.status(200).json({
      job,
      boardColumns,
    })
  } else {
    //  Remove from the job pool

    Job.findByIdAndDelete(_id).then(async (result) => {
      await JobStatus.findByIdAndUpdate(result.status, {
        $pull: { jobs: _id },
      })
      await JobDueDate.findByIdAndUpdate(result.dueDate, {
        $pull: { jobs: _id },
      })
      await User.findByIdAndUpdate(result.user, {
        $pull: { jobs: _id },
      })
      for (let i = 0; i < result.categories; i++) {
        await JobCategory.findByIdAndUpdate(result.categories[i], {
          $pull: { jobs: _id },
        })
      }
      switch (columnType) {
        case STATUS:
          boardColumns = await JobStatus.find().populate({
            path: 'jobs',
            populate: [{ path: 'dueDate' }, { path: 'user' }],
          })
          break
        case CATEGORY:
          boardColumns = await JobCategory.find().populate({
            path: 'jobs',
            populate: [{ path: 'dueDate' }, { path: 'user' }],
          })
          break
        case DUE_DATE:
          boardColumns = await JobDueDate.find().populate({
            path: 'jobs',
            populate: [{ path: 'dueDate' }, { path: 'user' }],
          })
          break
        case USER:
          boardColumns = await User.find().populate({
            path: 'jobs',
            populate: [{ path: 'dueDate' }, { path: 'user' }],
          })
          break
        default:
          break
      }
      await res.status(200).json({
        jobId: _id,
        boardColumns,
      })
    })
  }
}

/**
 * An util function to get a job by its object id and then respond it to the client
 */
const getJobByIdAndResponse = (_id, res) => {
  Job.findById(_id)
    .populate('status')
    .populate('categories')
    .populate('dueDate')
    .populate('user')
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(500).send('Server Error')
    })
}
