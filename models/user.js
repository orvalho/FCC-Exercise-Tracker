'use strict';

const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    index: true,
    default: shortid.generate
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: [15, 'username is too long - use no more than 15 characters']
  }
});

module.exports = mongoose.model('User', UserSchema);