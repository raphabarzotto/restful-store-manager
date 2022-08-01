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

// getById
describe('Get by ID (services/productsServices/getById)', () => {
  describe('No to product with given ID', () => {
    before(() => {
      sinon.stub(productsModels, 'getById').resolves([]);
    });

    after(() => {
      productsModels.getById.restore();
    });

    it('Returns undefined serviceResponse', async () => {
      const { serviceResponse } = await productsServices.getById(1);

      expect(serviceResponse).to.be.undefined;
    });
  });

  describe('Yes to product with given ID', () => {
    before(async () => {
      sinon.stub(productsModels, 'getById').resolves(mockedProduct);
    });

    after(async () => {
      productsModels.getById.restore();
    });

    it('Returns Object', async () => {
      const result = await productsModels.getById(1);

      expect(result).to.be.an('object');
    });

    it('"id" and "name" properties', async () => {
      const result = await productsModels.getById();

      expect(result).to.include.all.keys('id', 'name');
    });
  });
});

// create
describe('Create a new product - /productsServices/create', () => {

  describe('Create new product sucessfully', () => {
    const request = { name: "ProdutoX" };
    const response = { id: 4, name: 'ProdutoX' };

    before(() => {
      sinon.stub(productsModels, 'create').resolves(response);
    });

    after(() => {
      productsModels.create.restore();
    });

    it('Returns Object', async () => {
      const result = await productsServices.create(request);

      expect(result).to.be.an('object');
    });

    it('Not Empty Object', async () => {
      const result = await productsServices.create(request);

      expect(result).to.not.be.empty;
    });

    it('"code" and "serviceResponse" properties', async () => {
      const result = await productsServices.create(request);

      expect(result).to.include.all.keys('code', 'serviceResponse');
    });

    it('"id" and "name" properties', async () => {
      const result = await productsServices.create(request);

      expect(result.serviceResponse).to.include.all.keys('id', 'name');
    });
  });
});

// update
describe('Update a product - productsService/update', () => {
  describe('Update Sucessfully', () => {
    const request = { id: 1, name: "Martelo do Batman" };

    const response = { id: 1, name: 'Martelo do Batman' };

    before(() => {
      sinon.stub(productsModels, 'update').resolves(response);
    });

    after(() => {
      productsModels.update.restore();
    });

    it('Returns Object', async () => {
      const result = await productsServices.update(request);

      expect(result).to.be.an('object');
    });
    it('Not Empty Object', async () => {
      const result = await productsServices.update(request);

      expect(result).to.not.be.empty;
    });

    it('"code" and "serviceResponse" properties', async () => {
      const result = await productsServices.update(request);

      expect(result).to.include.all.keys('code', 'serviceResponse');
    });

    it('"id" and "name" properties', async () => {
      const result = await productsServices.update(request);

      expect(result.serviceResponse).to.include.all.keys('id', 'name');
    });
  });
});