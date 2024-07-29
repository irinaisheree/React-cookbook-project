const router = require("express").Router()
const recipeManager = require("../managers/recipeManager")
const {isAuth, isOwner} = require('../middlewares/authMiddleware');
const  recipe = require("../models/Recipe");
const User = require('../models/User')
const userManager = require("../managers/userManager")


router.get('/add', (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - add' });
});



router.post('/add', isAuth, async (req, res) => {
    console.log(req.body);
    const recipeData = req.body;

    try {
        const newRecipe = await recipeManager.create(recipeData, req.user._id);
        console.log(newRecipe);
        res.json(newRecipe);
    } catch (error) {
        console.error('Error adding recipe:', error.message);
        res.status(500).json({ error: 'Failed to add recipe' });
    }
});


router.get('/recipes', async (req, res) => {
    try {
        const allRecipes = await recipeManager.getAll();
        console.log(allRecipes)
        res.json(allRecipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/recipes/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;
    console.log('Requested recipe ID:', recipeId);
    try {
        const oneRecipe = await recipeManager.getOneWithDetails(recipeId); 
        console.log(oneRecipe);
        if (!oneRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        return res.json(oneRecipe);
    } catch (error) {
        console.error('Error fetching one recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router