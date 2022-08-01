const sinon = require('sinon');
const { expect } = require('chai');

// Need to implement this
const { connection, productsModels } = require('../../../models');

const mockedProduct = { id: 1, name: 'Martelo de Thor' };
// Will need getAll, getById, create, update, exclude and getByName

// getAll
describe('Get All Products - productsModels/getAll', () => {
  describe('When there are no registered products', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Returns array', async () => {
      const result = await productsModels.getAll();

      expect(result).to.be.an('array');
    });

    it('Empty Array', async () => {
      const result = await productsModels.getAll();

      expect(result).to.be.empty;
    });
  });

  describe('When there are registered products', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[mockedProduct]]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Returns array', async () => {
      const result = await productsModels.getAll();

      expect(result).to.be.an('array');
    });

    it('Not empty array', async () => {
      const result = await productsModels.getAll();

      expect(result).to.not.be.empty;
    });

    it('Object type', async () => {
      const result = await productsModels.getAll();

      result.map(item => {
        expect(item).to.be.an('object');
      });
    });

    it('"id" and "name" properties', async () => {
      const result = await productsModels.getAll();

      result.map(item => {
        expect(item).to.include.all.keys('id', 'name');
      })
    });
  });
});

// getById
describe('Get By ID - productsModels/getById', () => {
  describe('No to product with given ID', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Returs Array', async () => {
      const result = await productsModels.getById(1);

      expect(result).to.be.an('array');
    });

    it('Empty Array', async () => {
      const result = await productsModels.getById(1);

      expect(result).to.be.empty;
    });
  });

  describe('Yes to product with given ID', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mockedProduct]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Returns Object', async () => {
      const result = await productsModels.getById(1);

      expect(result).to.be.an('object');
    });

    it('Not empty array', async () => {
      const result = await productsModels.getById(1);

      expect(result).to.not.be.empty;
    });
  });
});

// create
describe('Create a new product - productsModels/create', () => {
  describe('Create new product sucessfully', () => {
    const result = [{
      insertId: 4,
    }];

    const request = { name: "ProdutoX" };

    before(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Returns Object', async () => {
      const result = await productsModels.create(request);

      expect(result).to.be.an('object');
    });

    it('Not Empty Object', async () => {
      const result = await productsModels.create(request);

      expect(result).to.not.be.empty;
    });

    it('"id" and "name" properties', async () => {
      const result = await productsModels.create(request);

      expect(result).to.include.all.keys('id', 'name');
    });
  });
});

// update
describe('Update a product - productsModels/update', () => {
  describe('Update Sucessfully', () => {
    const request = { id: 1, name: "Martelo do Batman" };

    const ResultSetHeader = {
      insertId: 0,
    };

    before(() => {
      sinon.stub(connection, 'execute').resolves([ResultSetHeader]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Returns Object', async () => {
      const result = await productsModels.update(request);

      expect(result).to.be.an('object');
    });

    it('Not Empty Object', async () => {
      const result = await productsModels.update(request);

      expect(result).to.not.be.empty;
    });

    it('"id" and "name" properties', async () => {
      const result = await productsModels.update(request);

      expect(result).to.include.all.keys('id', 'name');
    });
  });
});