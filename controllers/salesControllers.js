const { salesServices, productsServices } = require('../services');

const salesSchema = require('../joiSchemas/salesSchema');

// create
const create = async (req, res) => {
  const request = req.body;

  // posso fazer uma middleware pra isso depois
  for (let index = 0; index < request.length; index += 1) {
    const { error } = salesSchema.validate(request[index]);

    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(+code).json({ message });
    }
  }

  const verifyProductId = await Promise.all(request
    .map(async ({ productId }) => productsServices.getById(productId)));

  const idCheck = verifyProductId.find(({ serviceResponse }) => serviceResponse);

  if (!idCheck) return res.status(404).json({ message: 'Product not found' });

  const sales = await salesServices.create(request);

  return res.status(201).json(sales);
};

// getAll
const getAll = async (_req, res) => {
  const { code, serviceResponse } = await salesServices.getAll();

  return res.status(code).json(serviceResponse);
};

// getById
const getById = async (req, res) => {
  const { id } = req.params;

  const { code, serviceResponse } = await salesServices.getById(+id);

  if (serviceResponse.length === 0) return res.status(404).json({ message: 'Sale not found' });

  return res.status(code).json(serviceResponse);
};

// deleteById
const deleteById = async (req, res) => {
  const { id } = req.params;
  const numId = +id;

  const { serviceResponse } = await salesServices.getById(numId);

  if (serviceResponse.length === 0) return res.status(404).json({ message: 'Sale not found' });

  const { code } = await salesServices.deleteById(id);

  return res.status(+code).end();
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
};