const express = require('express');
const rescue = require('express-rescue');
const { salesControllers } = require('../controllers');

const salesRoutes = express.Router();

salesRoutes.post('/sales',
  rescue(salesControllers.create));

salesRoutes.get('/sales/',
  rescue(salesControllers.getAll));

module.exports = salesRoutes;