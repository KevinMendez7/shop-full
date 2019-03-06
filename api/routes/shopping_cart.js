'use strict'

const express = require('express');
const md_auth = require('../middleware/authenticated');
const setup = require('../db/setup');
const { ShoppingCartController } = setup();

const api = express.Router();

// Parying routes & logic
api.get('/shoppingcart/generateUniqueId', md_auth.ensureAuth, ShoppingCartController.generateId);
api.get('/shoppingcart/:cart_id', md_auth.ensureAuth, ShoppingCartController.findById);
api.post('/shoppingcart/add', md_auth.ensureAuth, ShoppingCartController.addItem);
api.put('/shoppingcart/update/:item_id', md_auth.ensureAuth, ShoppingCartController.updateItemQtty);
api.delete('/shoppingcart/empty/:cart_id', md_auth.ensureAuth, ShoppingCartController.emptyCart);


module.exports = api;
