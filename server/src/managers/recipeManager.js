const recipe = require('../models/Recipe');
const User = require('../models/User');

exports.getAll = () => recipe.find()

exports.getOne = (recipeId) => recipe.findById(recipeId)




exports.update = (recipeId, recipeData) => {
    return recipe.findByIdAndUpdate(recipeId, recipeData);
  };

exports.getOneWithDetails = (recipeId) => this.getOne(recipeId).populate('creator')

exports.create = async (recipeData, userId) => {
    try {
      const newrecipe = new recipe({
        ...recipeData,
        creator: userId // Convert userId to ObjectId
      });
  
      const savedrecipe = await newrecipe.save();
      await User.findByIdAndUpdate(userId, { $push: { createdrecipes: savedrecipe._id } });
  
      return savedrecipe;
    } catch (error) {
      throw error;
    }
  };
