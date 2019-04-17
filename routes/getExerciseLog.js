'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Exercise = require('../models/exercise.js');

module.exports = (req, res, next) => {
  const from = new Date(req.query.from);
  const to = new Date(req.query.to);
  User.findOne({id: req.query.userId}, (error, user) => {
    if (error) return next(error);
    if (!user) {
      return next({
        status: 400,
        message: 'unknown _id'        
      });
    }
    Exercise.find({
      userId: user.id,
      date: {
        $lt: to != 'Invalid Date' ? to.getTime() : Date.now(),
        $gt: from != 'Invalid Date' ? from.getTime() : 0
      }
    }, {__v: 0, _id: 0})
    .sort('-date')
    .limit(parseInt(req.query.limit))
    .exec((error, exercises) => {
      if (error) return next(error);
      const output = {
        _id: user.id,
        username: user.username,
        from: from != 'Invalid Date' ? from.toDateString() : undefined,
        to: to != 'Invalid Date' ? to.toDateString() : undefined,
        count: exercises.length,
        log: exercises.map(exercise => ({
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString()
          }))
      };
      res.json(output);
    });
  });
};