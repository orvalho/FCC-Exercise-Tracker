'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

module.exports = (req, res, next) => {
  const user = new User(req.body);
  user.save((error, savedUser) => {
    if (error) {
      // throw error message if username is already taken
      if (error.code === 11000) {
        return next({
          status: 400,
          message: 'username is already taken'        
        });
      }
      else {
        return next(error);
      }
    }
    // after user is created return an object with username and _id
    res.json({
      username: savedUser.username,
      _id: savedUser.id
    });
  });
};