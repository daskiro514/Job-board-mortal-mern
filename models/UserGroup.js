const mongoose = require('mongoose');

const UserGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    required: true,
    unique: true
  },
  icon: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model('user_groups', UserGroupSchema);
