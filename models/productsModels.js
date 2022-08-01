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
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;', [name, id],
  );

  return { id, name };
};

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;', [id],
  );
};

const getBySearch = async (name) => {
  queryName = `%${name}%`
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?;', [queryName],
  );

  return products;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  getBySearch,
}; 