'use strict'

const express = require('express');
const setup = require('../db/setup');
const { ShippingController } = setup();

const api = express.Router();

// Parying routes & logic
api.get('/shipping/regions', ShippingController.findAll);
api.get('/shipping/regions/:shipping_region_id', ShippingController.findById);


module.exports = api;
