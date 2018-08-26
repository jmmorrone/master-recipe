/* eslint-env node, mocha */
const { expect } = require('chai');
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');

const recipe = require('../../controllers/recipe');
const Recipe = require('../../models/recipe');

describe('Recipe routes', () => {
  let mongoMock;
  const testRecipe = new Recipe({ title: 'test' });

  beforeEach(() => {
    mongoMock = sinon.stub(Recipe, 'find').resolves([testRecipe]);
  });

  afterEach(() => {
    mongoMock.reset();
    Recipe.find.restore();
  });

  describe('Search routes', () => {
    it('should return no elements if query is empty', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      await recipe.searchRecipes(req, res);
      const response = res._getData();
      expect(response.length).to.equal(0);
    });

    it('should return a match', async () => {
      const req = httpMocks.createRequest({ query: { q: 'test' } });
      const res = httpMocks.createResponse();
      await recipe.searchRecipes(req, res);
      const response = res._getData();
      expect(response.length).to.equal(1);
      expect(response[0]).to.equal(testRecipe);
    });
  });
});
