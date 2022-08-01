const connection = require('./connection');

const create = async (sale) => {
  const { saleId, productId, quantity } = sale;

  const [sale] = await connection.execute(
    'INSERT StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [saleId, productId, quantity],
  );

  return sale;
};

const getAll = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products ORDER BY id;',
  );

  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?;', [id],
  );

  return sale;
};

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE `sale_id` = ?;', [id],
  );
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
}