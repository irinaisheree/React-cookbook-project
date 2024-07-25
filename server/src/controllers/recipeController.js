const router = require("express").Router()
// const recipeManager = requre("../managers/res")
const {isAuth, isOwner} = require('../middlewares/authMiddleware');
// const  recipe = require("../models/recipe");
// const User = require('../models/User')
// const userManager = require("../managers/userManager")



router.post('/add', isAuth, async (req, res) => {
    console.log(req.body);
    const recipeData = req.body;

    try {
        const newBook = await Manager.create(bookData, req.user._id);
        console.log(newBook);
        res.json(newBook);
    } catch (error) {
        console.error('Error adding book:', error.message);
        res.status(500).json({ error: 'Failed to add book' });
    }
});

module.exports = router