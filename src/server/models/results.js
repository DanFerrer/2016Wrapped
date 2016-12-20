const mongoose = require('mongoose');

const resultsSchema = new mongoose.schema({
  score: Number,
  right: Number,
  wrong: Number,
  takenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true});

module.exports = mongoose.model('Result', resultsSchema);
