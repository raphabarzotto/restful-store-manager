const sinon = require('sinon');
const { expect } = require('chai');

// Need to implement this
const { productsControllers } = require('../../../controllers');
const { productsServices } = require('../../../services');

const mockedProduct = { id: 1, name: 'Martelo de Thor' };
// getAll
describe('Get All Products (controllers/productsControllers/getAll)', () => {
  describe('When there are no registered products', () => {
    const fakeReq = {};
    const fakeRes = {};

    before(() => {
      const result = { code: 200, serviceResponse: [] };
      sinon.stub(productsServices, 'getAll').resolves(result);

      fakeReq.body = {};
      fakeRes.status = sinon.stub().returns(fakeRes);
      fakeRes.json = sinon.stub().returns();
    });

    after(() => {
      productsServices.getAll.restore();
    });

    it('Returns status 200', async () => {
      await productsControllers.getAll(fakeReq, fakeRes);

      expect(fakeRes.status.calledWith(200)).to.be.true;
    });

    it('Returns JSON array', async () => {
      await productsControllers.getAll(fakeReq, fakeRes);

      expect(fakeRes.json.calledWith(sinon.match.array)).to.be.true;
    });
  });

  describe('When there are registered products', () => {
    const fakeReq = {};
    const fakeRes = {};

    before(() => {
      const response = {
        code: 200,
        serviceResponse: [
          mockedProduct
        ]
      };
      sinon.stub(productsServices, 'getAll').resolves(response);

      fakeReq.body = {};
      fakeRes.status = sinon.stub().returns(fakeRes);
      fakeRes.json = sinon.stub().returns();
    });

    after(() => {
      productsServices.getAll.restore();
    });

    it('Returns status 200', async () => {
      await productsControllers.getAll(fakeReq, fakeRes);

      expect(fakeRes.status.calledWith(200)).to.be.true;
    });

    it('Returns JSON array', async () => {
      await productsControllers.getAll(fakeReq, fakeRes);

      expect(fakeRes.json.calledWith(sinon.match.array)).to.be.true;
    });

    it('Arrays contains things', async () => {
      await productsControllers.getAll(fakeReq, fakeRes);

      const args = fakeRes.json.args[2];
      const firstArg = args[0];
      const product = firstArg[0];

      expect(product).to.be.an('object');
    });
  });
});

// getById
describe('Get By ID (controllers/productsControllers/getById)', () => {
  describe('No to product with given ID', () => {
    const fakeReq = {};
    const fakeRes = {};

    before(() => {
      fakeReq.params = { id: 1 };
      const result = { code: 200, serviceResponse: undefined };
      fakeReq.body = {};
      fakeRes.status = sinon.stub().returns(fakeRes);
      fakeRes.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getById').resolves(result);
    });

    after(() => {
      productsServices.getById.restore();
    });

    it('Returns status 404', async () => {
      await productsControllers.getById(fakeReq, fakeRes);

      expect(fakeRes.status.calledWith(404)).to.be.true;
    });

    it('Retuns JSON undefined', async () => {
      await productsControllers.getById(fakeReq, fakeRes);

      expect(fakeRes.json.calledWith({ message: 'Product not found' })).to.be.true;
    });
  });

  describe('Yes to product with given ID', () => {
    const fakeReq = {};
    const fakeRes = {};

    before(() => {
      const response = {
        code: 200,
        serviceResponse: [
          mockedProduct
        ]
      };
      fakeReq.params = { id: 1 };
      sinon.stub(productsServices, 'getById').resolves(response);

      fakeReq.body = {};
      fakeRes.status = sinon.stub().returns(fakeRes);
      fakeRes.json = sinon.stub().returns();
    });

    after(() => {
      productsServices.getById.restore();
    });

    it('Returns status 200', async () => {
      await productsControllers.getById(fakeReq, fakeRes);

      expect(fakeRes.status.calledWith(200)).to.be.true;
    });

    it('Returns Array', async () => {
      await productsControllers.getById(fakeReq, fakeRes);

      expect(fakeRes.json.calledWith(sinon.match.array)).to.be.true;
    });

    it('Not empty array', async () => {
      await productsControllers.getById(fakeReq, fakeRes);

      const args = fakeRes.json.args[2];
      const firstArg = args[0];
      const product = firstArg[0];

      expect(product).to.be.an('object');
    });
  });
});

// create
describe('Create a new product - productsControllers/create', () => {
  describe('Create new product sucessfully', () => {
    const fakeReq = {};
    const fakeRes = {};

    before(() => {
      const response = {
        code: 200,
        serviceResponse: {
          id: 4,
          name: "ProdutoX"
        }
      };

      const response2 = {
        code: 200,
        serviceResponse: [
          {
            id: 1,
            name: 'Martelo de Thor'
          }
        ]
      };

      fakeReq.body = { name: "ProdutoX" };

      fakeRes.status = sinon.stub().returns(fakeRes);
      fakeRes.json = sinon.stub().returns();

      sinon.stub(productsServices, 'create').resolves(response);

      sinon.stub(productsServices, 'getAll').resolves(response2);
    });

    after(() => {
      productsServices.create.restore();

      productsServices.getAll.restore();
    });


    it('Status 201', async () => {
      await productsControllers.create(fakeReq, fakeRes);

      expect(fakeRes.status.calledWith(201)).to.be.true;
    });

    it('Returns JSON with productX', async () => {
      await productsControllers.create(fakeReq, fakeRes);

      expect(fakeRes.json.calledWith({ id: 4, name: "ProdutoX" })).to.be.true;
    });
  });
});

// update
describe('Update a product - productsControllers/update', () => {
  describe('Update Sucessfully', () => {
    const fakeReq = {};
    const fakeRes = {};

    before(() => {
      const response = {
        code: 200,
        serviceResponse: {
          id: 1,
          name: "Martelo do Batman"
        }
      };

      const response2 = {
        code: 200,
        serviceResponse: [
          {
            id: 1,
            name: 'Martelo de Thor'
          }
        ]
      };

      fakeReq.params = { id: 1 };
      fakeReq.body = { name: "Martelo do Batman" };
      fakeRes.status = sinon.stub().returns(fakeRes);
      fakeRes.json = sinon.stub().returns();

      sinon.stub(productsServices, 'update').resolves(response);

      sinon.stub(productsServices, 'getAll').resolves(response2);
    });

    after(() => {
      productsServices.update.restore();

      productsServices.getAll.restore();
    });

    it('Status 200', async () => {
      await productsControllers.update(fakeReq, fakeRes);

      expect(fakeRes.status.calledWith(200)).to.be.true;
    });

    it('Returns JSON with Martelo do Batman', async () => {
      await productsControllers.update(fakeReq, fakeRes);

      expect(fakeRes.json.calledWith({ id: 1, name: 'Martelo do Batman' })).to.be.true;
    });
  });
});