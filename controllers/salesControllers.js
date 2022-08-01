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

module.exports = {
  create,
};