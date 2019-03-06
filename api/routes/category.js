'use strict'

const express = require('express');
const setup = require('../db/setup');
const { CategoryController } = setup();

const api = express.Router();

// Parying routes & logic
api.get('/categories/', CategoryController.findAll);
api.get('/categories/:id', CategoryController.findById);
api.get('/categories/idDepartment/:department_id', CategoryController.findByDepartmentId);
api.get('/categories/idProduct/:category_id', CategoryController.findByProductId);

module.exports = api;
