const productsServices = require('../services/productsServices');

const productsSchema = require('../joiSchemas/productsSchema');

const getAll = async (_req, res) => {
  const { code, serviceResponse } = await productsServices.getAll();

  return res.status(code).json(serviceResponse);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { code, serviceResponse } = await productsServices.getById(+id);

  if (!serviceResponse) return res.status(404).json({ message: 'Product not found' });

  return res.status(code).json(serviceResponse);
};

const create = async (req, res) => {
  const { name } = req.body;

  const { error } = productsSchema.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(+code).json({ message });
  }

  const products = await productsServices.getAll();

  const validate = products.serviceResponse.some((p) => p.name === name);

  if (validate) return res.status(409).json({ message: 'Product already exists' });

  const { serviceResponse } = await productsServices.create(req.body);

  res.status(201).json(serviceResponse);
};

const update = async (req, res) => {
  const { id } = req.params;
  const numId = +id;
  const { name } = req.body;

  const { error } = productsCreateSchemas.validate(req.body);

  // posso fazer uma middleware pra isso depois
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(+code).json({ message });
  }

  const products = await productsServices.getAll();

  const validate = products.serviceResponse.find((p) => p.id === numId);

  if (!validate) return res.status(404).json({ message: 'Product not found' });

  const { code, serviceResponse } = await productsServices.update({ id: numId, name });

  res.status(code).json(serviceResponse);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};