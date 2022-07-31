const productsServices = require('../services/productServices');

const getAll = async (_req, res) => {
  const { code, serviceResponse } = await productsServices.getAll();

  return res.status(code).json(serviceResponse);
};

module.exports = {
  getAll,
};