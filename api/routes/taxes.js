'use strict'

const express = require('express');
const setup = require('../db/setup');
const { TaxesController } = setup();

const api = express.Router();

// Parying routes & logic
api.get('/tax', TaxesController.findAll);
api.get('/tax/:tax_id', TaxesController.findById);


module.exports = api;
