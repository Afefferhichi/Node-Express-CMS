const mongoose = require('mongoose');

const webpageSchema = new mongoose.Schema({
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  design: {
    type: String
  },
  html: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
    required: true
  },
});
//,{ collection: 'webpages' });

module.exports = mongoose.model('WebPage', webpageSchema);
