'use strict'

const express = require('express');
const md_auth = require('../middleware/authenticated');
const setup = require('../db/setup');
const { ProductController } = setup();

const api = express.Router();

// Parying routes & logic
api.get('/products/', ProductController.findAll);
api.get('/products/:id', ProductController.findById);
api.get('/products/idCategory/:category_id', ProductController.findByCategoryId);
api.get('/products/idDepartment/:department_id', ProductController.findByDepartmentId);
api.get('/products/:product_id/details', ProductController.findByIdDetails);
api.get('/products/:product_id/locations', ProductController.findByDepartment);
api.get('/products/:product_id/reviews', ProductController.findByReview);
api.post('/products/:product_id/reviews', md_auth.ensureAuth, ProductController.createReview);

module.exports = api;
