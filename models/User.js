const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Schema
const UserSchema = new Schema({
  firstName:{
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('users', UserSchema);