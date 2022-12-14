const express = require('express');
const rescue = require('express-rescue');
const { productsControllers } = require('../controllers');

const productsRoutes = express.Router();

productsRoutes.get('/',
  rescue(productsControllers.getAll));

productsRoutes.get('/search',
  rescue(productsControllers.getBySearch));

productsRoutes.get('/:id',
  rescue(productsControllers.getById));

productsRoutes.post('/',
  rescue(productsControllers.create));

productsRoutes.put('/:id',
  rescue(productsControllers.update));

productsRoutes.delete('/:id',
  rescue(productsControllers.deleteById));

module.exports = productsRoutes;