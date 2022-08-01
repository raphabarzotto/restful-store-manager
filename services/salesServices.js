const { salesModels } = require('../models');

const create = async (saleId, sale) => {
  await sale.map(async ({ productId, quantity }) => {
    salesModels.create(saleId, productId, quantity);
  });

  return true;
};

module.exports = {
  create,
}; 