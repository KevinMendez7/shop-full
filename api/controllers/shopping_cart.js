'use strict'

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

module.exports = function setupShoppingCartModel (ShoppingCartModel) {

  async function findById (req, res) {
    const { params: { cart_id } } = req;
    const cond = {
      cart_id
    }

    const result = await ShoppingCartModel.findAll(cond);

    if(result.length < 1){
      res.status(200).send({message: 'No items'});
    } else {
      res.status(200).send(result);
    }

  }

  async function updateItemQtty (req, res) {
    const { params: { item_id } } = req;
    const { body } = req;

    const cond = {
      where: { item_id }
    }

    const result = await ShoppingCartModel.update(body, cond);

    if (result < 1) {
      res.status(500).send({message: 'Error while trying to update quantity'});
    } else {
      res.status(200).send(body);
    }
  }

  async function emptyCart (req, res) {
    const { params: { cart_id } } = req;

    const cond = {
      where: { cart_id }
    }

    const result = await ShoppingCartModel.destroy(cond);

    if (result < 1) {
      res.status(500).send({message: 'Error while trying to empty shopping cart'});
    } else {
      res.status(200).send({message: 'Shopping cart is empty'});
    }
  }

  async function generateId (req, res) {

    const uuidv4 = require('uuid/v4');

    const result = uuidv4();

    res.status(200).send({'cart_id': result});
  }

  async function addItem (req, res) {

    const shoppingCart = new ShoppingCartModel();
    const { body } = req;

    shoppingCart.cart_id = body.cart_id;
    shoppingCart.product_id = body.product_id;
    shoppingCart.product_attrs = body.attributes;
    shoppingCart.quantity = 1;
    shoppingCart.buy_now = 1;
    shoppingCart.added_on = new Date();

    
    const result = await shoppingCart.save(shoppingCart);
    

    res.status(200).send(shoppingCart);
  }

  return {
    generateId,
    addItem,
    findById,
    updateItemQtty,
    emptyCart
  }
}
