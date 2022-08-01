const { salesModels } = require('../models');

const create = async (saleId, sale) => {
  const modelResponse = await sale.map(async ({ productId, quantity }) => {
    salesModels.create(saleId, productId, quantity);
  });

  return modelResponse;
};

const getAll = async () => {
  const modelResponse = await salesModels.getAll();

  return { code: 200, serviceResponse: modelResponse };
};

const getById = async (id) => {
  const modelResponse = await salesModels.getById(id);

  return { code: 200, serviceResponse: modelResponse };
};

const deleteById = async (id) => {
  await salesModels.deleteById(id);

  return { code: 204 };
};

const update = async ({ productId, quantity }) => {
  const modelResponse = await salesModels.update({ productId, quantity });

  return modelResponse;
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  update,
}; 