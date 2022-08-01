const express = require('express');
// precisa pra async?
const rescue = require('express-rescue');
const { productsControllers } = require('../controllers');

const productsRoutes = express.Router();

productsRoutes.get('/products',
  rescue(productsControllers.getAll));

productsRoutes.get('/products/:id',
  rescue(productsControllers.getById));

module.exports = productsRoutes;