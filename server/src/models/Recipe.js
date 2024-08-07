const mongoose = require("mongoose")
const User = require("./User")

const recipeSchema = new mongoose.Schema({
  
    title: {
        type: String, 
        required: [true, "Please add title"],
    },
    imageUrl: {
        type: String, 
        required: [true, 'Please add Image'],
        match: [/^https?:\/\//, 'Invalid poster link']
    },
    description: {
        type: String, 
        required: true,
        maxLength: [10000, 'Maximum characters exceeded - description cannot be longer than 1000 characters']
    },
    ingredients: {
        type: String, 
        required: [true, 'Please add ingredients'],
        maxLength: [10000, 'Maximum characters exceeded - ingredients cannot be longer than 1000 characters']
    },
    totalCost: {
        type: Number, 
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

})



const Recipe = mongoose.model("Recipe", recipeSchema)


module.exports = Recipe