const sinon = require('sinon');
const { expect } = require('chai');

// Need to implement this
const { connection, productsModels } = require('../../../models');

const mockedProduct = { id: 1, name: 'Martelo de Thor' };
// Will need getAll, getById, create and update

// getAll
describe('Get All Products (models/productsModels/getAll)', () => {
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

describe('Get By ID (models/productsModels/getById)', () => {
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

    it('Returns Array', async () => {
      const result = await productsModels.getById(1);

      expect(result).to.be.an('array');
    });

    it('Not empty array', async () => {
      const result = await productsModels.getById(1);

      expect(result).to.not.be.empty;
    });
  });
});