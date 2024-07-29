const Recipe = require('../models/Recipe');
const User = require('../models/User');

exports.getAll = () => Recipe.find()

exports.getOne = (recipeId) => Recipe.findById(recipeId)




exports.update = (recipeId, recipeData) => {
    return Recipe.findByIdAndUpdate(recipeId, recipeData);
  };

exports.getOneWithDetails = (recipeId) => this.getOne(recipeId).populate('creator')

exports.create = async (recipeData, userId) => {
    try {
      const newRecipe = new Recipe({
        ...recipeData,
        creator: userId // Convert userId to ObjectId
      });
  
      const savedRecipe = await newRecipe.save();
      await User.findByIdAndUpdate(userId, { $push: { createdrecipes: savedRecipe._id } });
  
      return savedRecipe;
    } catch (error) {
      throw error;
    }
  };
