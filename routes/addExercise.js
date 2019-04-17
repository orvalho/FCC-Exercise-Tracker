'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Exercise = require('../models/exercise');

module.exports = (req, res, next) => {
  User.findOne({id: req.body.userId}, (error, user) => {
    if (error) return next(error);
    // if user with submitted id doesn't exist
    if (!user) {
      return next({
        status: 400,
        message: 'unknown _id'        
      });
    }
    // if user with submitted id does exist
    const exercise = new Exercise(req.body);
    exercise.username = user.username;
    exercise.save((error, savedExercise) => {
      if (error) return next(error);
      savedExercise = savedExercise.toObject();
      delete savedExercise.__v;
      savedExercise._id = savedExercise.userId;
      delete savedExercise.userId;
      savedExercise.date = (new Date(savedExercise.date)).toDateString();
      res.json(savedExercise);
    });
  });
};