const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  id: {
    type: String
  },
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  location: {
    type: String
  },
  profileUrl: {
    type: String
  },
  image: {
    type: String,
  }
});

module.exports = mongoose.model('users', UserSchema);