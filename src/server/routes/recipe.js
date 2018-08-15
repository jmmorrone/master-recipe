const _ = require('lodash');
const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const { Recipe } = require('../models/db');

const router = express.Router();

/**
 * Create Recipe
 */
router.post('/api/recipes', ensureLoggedIn, async (req, res) => {
  const body = _.get(req, 'body', null);
  const author = _.get(req, 'user.displayName', null);
  if (!body || !author) return res.status(500).send({ error: 'Cannot POST recipe' });
  body.author = author;
  const recipe = new Recipe(body);
  const result = await recipe.save();
  if (!result) return res.status(500).send({ error: 'Cannot save recipe' });
  return res.status(200).send(result);
});

/**
 * Read Recipe
 */
router.get('/api/recipes/:id', async (req, res) => {
  const id = _.get(req, 'params.id', null);
  if (!id) return res.status(500).send({ error: 'Cannot GET recipe' });

  const result = await Recipe.findById({ id }).exec();
  if (!result) return res.status(404).send({ error: 'Cannot GET recipe' });

  return res.status(200).send(result);
});

/**
 * Update Recipe
 */
router.put('/api/recipes/:id', ensureLoggedIn, async (req, res) => {
  const id = _.get(req, 'params.id', null);
  const body = _.get(req, 'body', null);
  if (!id || !body) return res.status(500).send({ error: 'Cannot GET recipe' });

  const result = await Recipe.findByIdAndUpdate({ id }, body).exec();
  if (!result) return res.status(404).send({ error: 'Cannot GET recipe' });

  return res.status(200).send(result);
});

/**
 * Delete Recipe
 */
router.delete('/api/recipes/:id', ensureLoggedIn, async (req, res) => {
  const id = _.get(req, 'params.id', null);
  if (!id) return res.status(500).send({ error: 'Cannot GET recipe' });

  const result = await Recipe.deleteOne({ id }).exec();
  if (!result) return res.status(404).send({ error: 'Cannot DELETE recipe' });

  return res.status(200).send({ message: 'Deleted successfully' });
});

/**
 * All recipes
 */
router.get('/api/recipes', async (req, res) => {
  const result = await Recipe.find().exec();
  if (!result) return res.status(404).send({ error: 'Cannot GET recipes' });

  return res.status(200).send(result);
});

module.exports = router;
