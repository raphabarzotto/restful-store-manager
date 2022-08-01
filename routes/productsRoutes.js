const express = require('express');
// precisa pra async?
const rescue = require('express-rescue');
const { productsControllers } = require('../controllers');

const productsRoutes = express.Router();

productsRoutes.get('/',
  rescue(productsControllers.getAll));

productsRoutes.get('/:id',
  rescue(productsControllers.getById));

productsRoutes.post('/',
  rescue(productsControllers.create));

module.exports = productsRoutes;