'use strict'

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

module.exports = function setupShoppingCartModel (OrderDetailModel, OrderModel) {

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

  async function createOrder (req, res) {

    const order = new OrderModel();
    const { body } = req;

    order.cart_id = body.cart_id;
    order.customer_id = body.customer_id;
    order.shipping_id = body.shipping_id;
    order.tax_id = body.tax_id;
    order.total_amount = '0.00';
    order.shipped_on = new Date();
    order.status = 0;
    order.comments = '';
    order.auth_code = '';
    order.created_on = new Date();

    
    const result = await order.save(order);

    const [ orderId ] = await OrderModel.findAll({
      attributes: ['order_id'],
      where: {
        customer_id: body.customer_id,
        shipping_id: body.shipping_id,
        tax_id: body.tax_id
      },
      limit: 1,
      order: [ [ 'order_id', 'DESC' ]]
    });

    console.log(orderId.order_id)

    res.status(200).send({order_id: orderId.order_id});
  }

  return {
    generateId,
    createOrder,
    findById,
    updateItemQtty,
    emptyCart
  }
}
