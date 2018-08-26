const express = require('express');
const recipe = require('../controllers/recipe');
const { authCheck } = require('../auth');

const router = express.Router();

/**
 * Create Recipe
 */
router.post('/recipes', authCheck, recipe.createRecipe);

/**
 * Read Recipe
 */
router.get('/recipes/:id', authCheck, recipe.getRecipe);

/**
 * Update Recipe
 */
router.patch('/recipes/:id', authCheck, recipe.updateRecipe);

/**
 * Delete Recipe
 */
router.delete('/recipes/:id', authCheck, recipe.deleteRecipe);

/**
 * All recipes
 */
router.get('/recipes', recipe.getAllRecipes);

/**
 * Search recipes
 */
router.post('/search', recipe.searchRecipes);

module.exports = router;
