const { productsModels } = require('../models');

const getAll = async () => {
  const modelResponse = await productsModels.getAll();

  return { code: 200, serviceResponse: modelResponse };
};

const getById = async (id) => {
  const [modelResponse] = await productsModels.getById(id);

  return { code: 200, serviceResponse: modelResponse };
};

const create = async ({ name }) => {
  const modelResponse = await productsModels.create({ name });

  return { code: 200, serviceResponse: modelResponse };
};

module.exports = {
  getAll,
  getById,
  create,
}; 