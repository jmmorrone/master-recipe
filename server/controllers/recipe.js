const _ = require('lodash');
const cache = require('../cache');
const Recipe = require('../models/recipe');

/**
 * Create Recipe
 */
const createRecipe = async (req, res) => {
  try {
    const body = _.get(req, 'body', null);
    if (!body) return res.status(500).send({ error: 'Cannot POST recipe' });

    const recipe = new Recipe(body);
    const result = await recipe.save();

    cache.reset();
    res.set('Location', `/recipes/${result.id}`);
    return res.status(201).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Read Recipe
 */
const getRecipe = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    if (!id) return res.status(500).send({ error: 'Cannot GET recipe' });

    const result = await Recipe.findById(id);

    return res.send(result);
  } catch (err) {
    return res.status(404).send({ error: 'Cannot GET recipe' });
  }
};

/**
 * Update Recipe
 */
const updateRecipe = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    const body = _.get(req, 'body', null);
    if (!id || !body) return res.status(500).send({ error: 'Cannot GET recipe' });

    const result = await Recipe.findByIdAndUpdate(id, body);
    if (!result) return res.status(404).send({ error: 'Cannot UPDATE recipe' });
    cache.reset();

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Delete Recipe
 */
const deleteRecipe = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    if (!id) return res.status(500).send({ error: 'Cannot GET recipe' });

    const result = await Recipe.findOneAndDelete(id);
    if (!result) return res.status(404).send({ error: 'Cannot DELETE recipe' });
    cache.reset();

    return res.status(204).send({ message: 'Deleted successfully' });
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * All recipes
 */
const getAllRecipes = async (req, res) => {
  try {
    const cachedResponse = cache.get('all-recipes');
    if (cachedResponse) return res.status(200).send(cachedResponse);

    const result = await Recipe.find().exec();
    if (!result) return res.status(404).send({ error: 'Cannot GET recipes' });
    cache.set('all-recipes', JSON.stringify(result));

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ error: 'Cannot GET recipes' });
  }
};

/**
 * "Private" find method
 */
const findRecipes = async (req, res, searchTerm) => {
  try {
    const cachedResponse = cache.get(searchTerm);
    if (cachedResponse) return res.status(200).send(cachedResponse);

    const result = await Recipe.find(searchTerm);
    cache.set(searchTerm, result);

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ error: 'Cannot GET recipes' });
  }
};

/**
 * Search recipes
 */
const searchRecipes = async (req, res) => {
  const queryParams = _.get(req, 'query.q', null);
  if (!queryParams) return res.status(200).send([]);
  return findRecipes(req, res, { title: new RegExp(`${queryParams}`, 'i') });
};

/**
 * User recipes
 */
const userRecipes = async (req, res) => {
  const user = _.get(req, 'query.q', null);
  if (!user) return res.status(200).send([]);
  return findRecipes(req, res, { author: new RegExp(`${user}`, 'i') });
};

module.exports = {
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  getAllRecipes,
  userRecipes,
};
