const sinon = require('sinon');
const { expect } = require('chai');

// Need to implement this
const { productsServices } = require('../../../services');
const { productsModels } = require('../../../models');

const mockedProduct = { id: 1, name: 'Martelo de Thor' };
// getAll
describe('Get All Products (services/productsServices/getAll)', () => {

  describe('When there are no registered products', () => {
    before(() => {
      sinon.stub(productsModels, 'getAll').resolves([]);
    });

    after(() => {
      productsModels.getAll.restore();
    });

    it('Returns array', async () => {
      const { serviceResponse } = await productsServices.getAll();

      expect(serviceResponse).to.be.an('array');
    });

    it('Empty Array', async () => {
      const { serviceResponse } = await productsServices.getAll();
      expect(serviceResponse).to.be.empty;
    });
  });

  describe('When there are registered products', () => {
    before(async () => {
      sinon.stub(productsModels, 'getAll').resolves([mockedProduct]);
    });

    after(async () => {
      productsModels.getAll.restore();
    });

    it('Returns array', async () => {
      const { serviceResponse } = await productsServices.getAll();

      expect(serviceResponse).to.be.an('array');
    });

    it('Not empty array', async () => {
      const { serviceResponse } = await productsServices.getAll();

      expect(serviceResponse).to.not.be.empty;
    });

    it('Object type', async () => {
      const { serviceResponse } = await productsServices.getAll();

      serviceResponse.map(item => {
        expect(item).to.be.an('object'); 
      });
    });

    it('"id" and "name" properties', async () => {
      const { serviceResponse } = await productsServices.getAll();

      serviceResponse.map(item => {
        expect(item).to.include.all.keys('id', 'name'); 
      });
    });
  });
});