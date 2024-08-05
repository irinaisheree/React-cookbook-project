const router = require("express").Router()
const recipeManager = require("../managers/recipeManager")
const {isAuth, isOwner} = require('../middlewares/authMiddleware');
const  recipe = require("../models/Recipe");
const User = require('../models/User')
const userManager = require("../managers/userManager");
const Recipe = require("../models/Recipe");


router.get('/add', (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - add' });
});



router.post('/add', isAuth, async (req, res) => {

    const recipeData = req.body;

    try {
        const newRecipe = await recipeManager.create(recipeData, req.user._id);

        res.json(newRecipe);
    } catch (error) {
        console.error('Error adding recipe:', error.message);
        res.status(500).json({ error: 'Failed to add recipe' });
    }
});


router.get('/recipes', async (req, res) => {
    try {
        const allRecipes = await recipeManager.getAll();

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
  
        if (!oneRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        return res.json(oneRecipe);
    } catch (error) {
        console.error('Error fetching one recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/recipes/:recipeId/edit', isAuth, async (req, res) => {
    try {
      const recipeId = req.params.recipeId;

      const recipe = await recipeManager.getOneWithDetails(recipeId);
      
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      
      res.status(200).json(recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.post('/recipes/:recipeId/edit', isAuth, isOwner, async (req, res) => {
    const recipeId = req.params.recipeId;
    const recipeData = req.body;
    
    try {
      // Update the book data in your database using bookId and bookData
      // For now, let's assume the book is updated successfully
      const updatedRecipe = await recipeManager.update(recipeId, recipeData);
      
      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete('/recipes/:recipeId/delete', async (req, res) => {
    try {
      const recipeId = req.params.recipeId; // Corrected parameter name
      // Check if the book exists
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      await Recipe.findByIdAndDelete(recipeId);
      return res.status(204).send(); // No content
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
 

 
  router.post('/recipes/:recipeId/like', isAuth, async (req, res) => {
    console.log('User:', req.user); // Check the user data
    console.log('Recipe ID:', req.params.recipeId); // Check the destination ID
    
    const recipeId = req.params.recipeId;
    const userId = req.user.id;
    try {
        const likedRecipes = await userManager.likeRecipe(recipeId, userId);
        res.status(200).json({ message: 'Recipe liked successfully', likedRecipes });
    } catch (error) {
        console.error('Error liking recipe:', error); // Log detailed error
        res.status(400).json({ error: error.message });
    }
});



  router.post('/recipes/:recipeId/unlike', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;

    try {
        const unlikedRecipes = await userManager.unlikeRecipe(recipeId, userId);
        res.status(200).json({ message: 'Recipe unliked successfully', unlikedRecipes });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

  router.post('/users/:userId/likedRecipes', async (req, res) => {
    try {
      const { userId } = req.params;
      const { recipeId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!user.likedRecipes.includes(recipeId)) {
        user.likedRecipes.push(recipeId);
        await user.save();
      }
  
      res.status(200).json({ message: 'Recipe added to liked list' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });


///

router.get('/users/:userId/likedRecipes', isAuth, async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('likedRecipes');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user.likedRecipes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching liked recipes', error });
    }
  });


  router.get('/users/:userId/addedRecipes', isAuth, async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('addedRecipes');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user.addedRecipes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching added recipes', error });
    }
  });


  router.post('/users/:userId/checkedRecipes/:recipeId', isAuth, async (req, res) => {
    try {
      const { userId, recipeId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Toggle recipe's checked status
      const isChecked = user.checkedRecipes.includes(recipeId);
      if (isChecked) {
        user.checkedRecipes.pull(recipeId);
      } else {
        user.checkedRecipes.push(recipeId);
      }
  
      await user.save();
      res.json({ message: 'Checked status updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating checked status', error });
    }
  });
  
module.exports = router