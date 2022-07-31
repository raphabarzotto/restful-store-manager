const express = require('express');
// precisa pra async?
const rescue = require('express-rescue');
const { productsControllers } = require('../controllers');

const productsRoutes = express.Router();

productsRoutes.get('/',
  rescue(productsControllers.getAll));

module.exports = productsRoutes;