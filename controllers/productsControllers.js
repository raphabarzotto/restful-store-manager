// const productsServices = require('../services/productsServices');

// const getAll = async (_req, res) => {
//   const { code, serviceResponse } = await productsServices.getAll();

//   return res.status(code).json(serviceResponse);
// };

// const getById = async (req, res) => {
//   const { id } = req.params;

//   const { code, serviceResponse } = await productsServices.getById(+id);

//   if (!serviceResponse) return res.status(404).json({ message: 'Product not found' });

//   return res.status(code).json(serviceResponse);
// };

// module.exports = {
//   getAll,
//   getById,
// };