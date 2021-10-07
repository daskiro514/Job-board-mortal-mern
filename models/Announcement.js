const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  headline: {
    type: String,
    default: "",
    required: true
  },
  content: {
    type: String,
    default: ""
  },
  featuredImage: {
    type: String,
    default: ""
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: Date.now
  },
  audience: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_groups'
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
}, { timestamps: true });

module.exports = mongoose.model('announcements', AnnouncementSchema);
