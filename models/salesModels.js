const connection = require('./connection');

const create = async (sale) => {
  const { saleId, productId, quantity } = sale;

  const [sale] = await connection.execute(
    'INSERT StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [saleId, productId, quantity],
  );

  return sale;
};

module.exports = {
  create,
}