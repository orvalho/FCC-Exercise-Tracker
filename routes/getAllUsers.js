'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

module.exports = (req, res) => {
  User.find({}, (error, users) => {
    users = users.map(user => {
      return ({
        _id: user.id,
        username: user.username,
        __v: 0
      });
    });
    res.json(users);
  });
};