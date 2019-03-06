'use strict'

const express = require('express');
const setup = require('../db/setup');
const { DepartmentController } = setup();

const api = express.Router();

// Parying routes & logic
api.get('/departments/:id', DepartmentController.findById);
api.get('/departments/', DepartmentController.findAll);

module.exports = api;
