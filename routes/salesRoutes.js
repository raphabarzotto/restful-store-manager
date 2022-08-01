const express = require('express');
const rescue = require('express-rescue');
const { salesControllers } = require('../controllers');

const salesRoutes = express.Router();

salesRoutes.post('/sales',
  rescue(salesControllers.create));

module.exports = salesRoutes;