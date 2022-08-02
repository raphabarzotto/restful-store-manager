const { response } = require('express');
const { salesModels } = require('../models');

const create = async (request) => {
  const allSales = await salesModels.getAll();
  const saleId = allSales[allSales.length - 1].sale_id + 1;

  for (let index = 0; index < request.length; index += 1) { 
    await salesModels.create(saleId, request[index])
  }

  return ({id: saleId, itemsSold: request})
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