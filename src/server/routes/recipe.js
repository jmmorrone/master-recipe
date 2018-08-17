const _ = require('lodash');
const express = require('express');
const ensureLoggedIn = require('../authCheck');
const { Recipe } = require('../models/db');

const router = express.Router();

/**
 * Create Recipe
 */
router.post('/api/recipes', ensureLoggedIn, async (req, res) => {
  try {
    const body = _.get(req, 'body', null);
    const author = _.get(req, 'user.displayName', null);
    if (!body || !author) return res.status(500).send({ error: 'Cannot POST recipe' });

    body.author = author;
    const recipe = new Recipe(body);
    const result = await recipe.save();

    res.set('Location', `/api/recipes/${result.id}`);
    return res.status(201).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Read Recipe
 */
router.get('/api/recipes/:id', async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    if (!id) return res.status(500).send({ error: 'Cannot GET recipe' });

    const result = await Recipe.findById(id);

    return res.send(result);
  } catch (err) {
    return res.status(404).send({ error: 'Cannot GET recipe' });
  }
});

/**
 * Update Recipe
 */
router.put('/api/recipes/:id', ensureLoggedIn, async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    const body = _.get(req, 'body', null);
    if (!id || !body) return res.status(500).send({ error: 'Cannot GET recipe' });

    const result = await Recipe.findByIdAndUpdate(id, body);
    if (!result) return res.status(404).send({ error: 'Cannot UPDATE recipe' });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Delete Recipe
 */
router.delete('/api/recipes/:id', ensureLoggedIn, async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    if (!id) return res.status(500).send({ error: 'Cannot GET recipe' });

    const result = await Recipe.findOneAndRemove(id).exec();
    if (!result) return res.status(404).send({ error: 'Cannot DELETE recipe' });

    return res.status(204).send({ message: 'Deleted successfully' });
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * All recipes
 */
router.get('/api/recipes', async (req, res) => {
  try {
    const result = await Recipe.find().exec();
    if (!result) return res.status(404).send({ error: 'Cannot GET recipes' });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ error: 'Cannot GET recipes' });
  }
});

/**
 * Search recipes
 */
router.get('/api/search', async (req, res) => {
  try {
    const queryParams = _.get(req, 'query', '');

    const result = await Recipe.find(queryParams).exec();
    if (!result) return res.status(404).send({ error: 'No recipes found' });

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ error: 'Cannot GET recipes' });
  }
});

module.exports = router;
