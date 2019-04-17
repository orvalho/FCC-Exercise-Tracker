'use strict';

const express = require('express');
const router = express.Router();

const addUser = require('./addUser');
const getAllUsers = require('./getAllUsers');
const addExercise = require('./addExercise');
const getExerciseLog = require('./getExerciseLog');

router.use('/new-user', addUser);
router.use('/users', getAllUsers);
router.use('/add', addExercise);
router.use('/log', getExerciseLog);

module.exports = router;