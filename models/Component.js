const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  layout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'layouts'
  }
}, { timestamps: true });

module.exports = mongoose.model('components', ComponentSchema);
