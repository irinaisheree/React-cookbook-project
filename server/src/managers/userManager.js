
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');
const Recipe = require('../models/Recipe')

exports.register = async (userData) => {


   const email = await User.findOne({email: userData.email}) 
   if(email){
    throw new Error("Email already exists")
   }

   return User.create(userData)
};

exports.login = async (email, password) => {
    // Get user from db
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
        throw new Error('Cannot find email or password');
    }

    // Check if password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Cannot find email or password');
    }

    // Generate jwt token
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '24h' });

    // return token and user data
    return {
        token,
        user: {
            _id: user._id,
            email: user.email,
            // Add other user details if needed
        }
    };
}

exports.getOneUser = (userId) => {
    return User.findById(userId)
      .populate({
        path: 'likedRecipes',
        select: '_id title creator price imageUrl description',
      })
      .exec();
  };


  exports.likeRecipe = async (recipeId, userId) => {
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            throw new Error('Recipe not found');
        }

        if (recipe.likes.includes(userId)) {
            // Optionally, you can return a different message or status code
            return { message: 'You already liked this recipe', recipe };
        }

        recipe.likes.push(userId);
        await User.findByIdAndUpdate(userId, { $addToSet: { likedRecipes: recipeId } });
        await recipe.save();

        return { message: 'Recipe liked successfully', recipe };
    } catch (error) {
        throw new Error(`Failed to like recipe: ${error.message}`);
    }
};


exports.unlikeRecipe = async (recipeId, userId) => {
    try {
        // Find the destination by ID
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
  
        // Check if the user has liked the destination
        if (!recipe.likes.includes(userId)) {
            throw new Error('You have not liked this destination');
        }
  
        // Remove the user's ID from the likes array
        recipe.likes.pull(userId);
  
        // Update the user's likedDestinations array without loading the full user object
        await User.findByIdAndUpdate(userId, {
            $pull: { likedRecipes: recipeId }
        });
  
        // Save the updated destination
        await recipe.save();
  
        return recipe;
    } catch (error) {
        throw new Error(`Failed to unlike recipe: ${error.message}`);
    }
  };

exports.getUserProfile = (userId) => User.findById(userId).populate('addedRecipes').populate('likedRecipes').populate('checkedRecipes')