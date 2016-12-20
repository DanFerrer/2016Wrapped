const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  spotifyId: { type: String, index: true },
  email: { type: String, unique: true, lowercase: true },
  userName: String,
  profile: String,
  displayName: String,
  picture: String,
  attempts: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
