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
  if (!body || !author) return;
  body.author = author;
  const recipe = new Recipe(body);
  const callback = await recipe.save();
  if (!callback) return;
  res.json(callback);
});

/**
 * Read Recipe
 */
router.get('/api/recipes/:id', async (req, res) => {
  const id = _.get(req, 'params.id', null);
  const recipe = await Recipe.findById({ id });
  if (!recipe) return;
  res.json(recipe);
});

/**
 * Update Recipe
 */
router.put('/api/recipes/:id', ensureLoggedIn, async (req, res) => {
  const id = _.get(req, 'params.id', null);
  const body = _.get(req, 'body', null);
  if (!id || !body) return;
  const callback = await Recipe.findByIdAndUpdate({ id }, body);
  if (!callback) return;
  res.json(callback);
});

/**
 * Delete Recipe
 */
router.delete('/api/recipes/:id', ensureLoggedIn, async (req, res) => {
  const id = _.get(req, 'params.id', null);
  if (!id) return;
  const callback = await Recipe.deleteOne({ id });
  if (!callback) return;
  res.json(callback);
});

module.exports = router;
