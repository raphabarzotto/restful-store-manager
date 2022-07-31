const productsModels = require('../models');

const getAll = async () => {
  const modelResponse = await productsModels.getAll();

  return { code: 200, serviceResponse: modelResponse };
};

module.exports = {
  getAll,
}; 