const mongoose = require('mongoose');

const LayoutSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    required: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('layouts', LayoutSchema);
