const _ = require('lodash');
const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const Recipe = require('../models/recipe');

const router = express.Router();

/**
 * Create Recipe
 */
router.post('/recipes', ensureLoggedIn, async (req, res) => {
  try {
    const body = _.get(req, 'body', null);
    // TODO: When auth is enabled, remove 'test'
    const author = 'test' || _.get(req, 'user.displayName', null);
    if (!body || !author) return res.status(500).send({ error: 'Cannot POST recipe' });

    body.author = author;
    const recipe = new Recipe(body);
    const result = await recipe.save();

    res.set('Location', `/recipes/${result.id}`);
    return res.status(201).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Read Recipe
 */
router.get('/recipes/:id', ensureLoggedIn, async (req, res) => {
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
router.put('/recipes/:id', ensureLoggedIn, async (req, res) => {
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
router.delete('/recipes/:id', ensureLoggedIn, async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    if (!id) return res.status(500).send({ error: 'Cannot GET recipe' });

    const result = await Recipe.findOneAndDelete(id);
    if (!result) return res.status(404).send({ error: 'Cannot DELETE recipe' });

    return res.status(204).send({ message: 'Deleted successfully' });
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * All recipes
 */
router.get('/recipes', ensureLoggedIn, async (req, res) => {
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
router.post('/search', ensureLoggedIn, async (req, res) => {
  try {
    const queryParams = _.get(req, 'query', '');

    const result = await Recipe.find(queryParams).exec();
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ error: 'Cannot GET recipes' });
  }
});

module.exports = router;
