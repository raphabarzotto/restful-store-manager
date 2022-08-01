const express = require('express');
const rescue = require('express-rescue');
const { salesControllers } = require('../controllers');

const salesRoutes = express.Router();

salesRoutes.post('/',
  rescue(salesControllers.create));

salesRoutes.get('/',
  rescue(salesControllers.getAll));

salesRoutes.get('/:id',
  rescue(salesControllers.getById));

salesRoutes.put('/:id',
  rescue(salesControllers.update));

salesRoutes.delete('/:id',
  rescue(salesControllers.deleteById));

module.exports = salesRoutes;