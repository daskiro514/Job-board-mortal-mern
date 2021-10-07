const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      default: '',
    },
    firstname: {
      type: String,
      default: '',
    },
    middlename: {
      type: String,
      default: '',
    },
    lastname: {
      type: String,
      default: '',
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      default: '',
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_groups',
      },
    ],
    phone: {
      type: String,
      default: '',
    },
    mobile: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
      required: true,
    },
    name: {
      type: String,
      default: '',
      required: true,
    },
    password: {
      type: String,
      default: '',
    },
    birthday: {
      type: Date,
      default: Date.now,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    profileHeader: {
      type: String,
      default: '',
    },
    leftMenu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'components',
      },
    ],
    rightMenu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'components',
      },
    ],
    dashboard: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'components',
      },
    ],
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs',
        unique: true,
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('users', UserSchema)
