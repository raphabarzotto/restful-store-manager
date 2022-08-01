const { salesModels } = require('../models');

const create = async (saleId, sale) => {
  const modelResponse = await sale.map(async ({ productId, quantity }) => {
    salesModels.create(saleId, productId, quantity);
  });

  return modelResponse;
};

const getAll = async () => {
  const modelResponse = await salesModels.getAll();

  return modelResponse;
};

const getById = async (id) => {
  const modelResponse = await salesModels.getById(id);

  return modelResponse;
};

module.exports = {
  create,
  getAll,
  getById,
}; 