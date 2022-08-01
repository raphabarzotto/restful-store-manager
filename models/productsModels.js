const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );

  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;', [id],
  );

  return product;
};

const create = async ({ name }) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );

  return { id: product.insertId, name };
};

const update = async ({ id, name }) => {
  const [product] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;', [name, id],
  );

  return { id, name: product.name };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
}; 