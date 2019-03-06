'use strict'

const express = require('express');
const md_auth = require('../middleware/authenticated');
const setup = require('../db/setup');
const { OrderController } = setup();

const api = express.Router();

// Parying routes & logic
api.post('/orders/', md_auth.ensureAuth, OrderController.createOrder);
api.get('/shoppingcart/generateUniqueId', md_auth.ensureAuth, OrderController.generateId);
api.get('/shoppingcart/:cart_id', md_auth.ensureAuth, OrderController.findById);
api.put('/shoppingcart/update/:item_id', md_auth.ensureAuth, OrderController.updateItemQtty);
api.delete('/shoppingcart/empty/:cart_id', md_auth.ensureAuth, OrderController.emptyCart);


module.exports = api;
