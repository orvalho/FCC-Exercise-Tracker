'use strict';

const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  description: {
    type: String,
    required: true,
    maxlength: [20, 'description is too long - use no more than 20 characters']
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },  
  username: String,
  userId: {
    type: String,
    index: true,
    ref: 'User'
  }  
});

ExerciseSchema.pre('save', function(next) {
  User.findOne({id: this.userId}, (error, user) => {
    if (error) return next(error);
    if (!user) {
      const error = new Error('unknown userId');
      error.status = 400;
      return next(error);
    }
    if (!this.date) {
      this.date = Date.now();
    }
    next();
  });
});

module.exports = mongoose.model('Exercise', ExerciseSchema);