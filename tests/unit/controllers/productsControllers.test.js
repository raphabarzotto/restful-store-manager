const sinon = require('sinon');
const { expect } = require('chai');

// Need to implement this
const { productsControllers } = require('../../../controllers');
const { productsServices } = require('../../../services');

const mockedProduct = { id: 1, name: 'Martelo de Thor' };
// getAll
describe('Get All Products (controllers/productsControllers/getAll)', () => {
  describe('When there are no registered products', () => {
// devo mockar fora? descobrir durante o desenvolvimento
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
// devo mockar fora? descobrir durante o desenvolvimento, part 2
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