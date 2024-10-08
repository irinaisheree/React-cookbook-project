const userRouter = require("express").Router();
// const { getErrorMessage } = require('../utils/errorUtils');
const userManager = require('../managers/userManager');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');

// const User = require('../models/User');
// const recipeManager = require('../managers/recipeManager');
// const Recipe = require('../models/Recipe'); // Add this line

userRouter.get('/register', (req, res) => {
    res.status(405).json({ error: 'GET recipe allowed for this endpoint - register' });
});

userRouter.post('/register', isGuest, async (req, res) => {
    try {
        const user = await userManager.register(req.body);
        res.json(user);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle Mongoose validation errors
            const errors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({ errors });
        } else {
            if (error.message === 'Email already exists') {
                return res.status(400).json({ errors: [{ field: 'email', message: error.message }] });
            }

            console.error('Error registering user:', error);
            return res.status(500).json({ error: 'Something bad happened. Please, try again.' });
        }
    }
});

userRouter.get('/login', isGuest, (req, res) => {
    res.status(405).json({ error: 'GET method not allowed for this endpoint - login' });
});

userRouter.post('/login', isGuest, async (req, res) => {
    try {
        const { email, password } = req.body;

        const { token, user } = await userManager.login(email, password);
        res.json({ token, user });
    } catch (error) {
        console.error('Error logging user:', error);
        res.status(401).json({ error: 'Invalid email or password' });
    }
});

userRouter.get('/logout', isAuth, (req, res) => {
    res.status(200).clearCookie('token').send();
});


userRouter.get('/:userId/profile', async(req, res) => {
    const userId = req.params.userId


   
    try {
        const currentUser = await userManager.getUserProfile(userId)

        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(currentUser);
    } catch (error) {
        console.error('Error fetching one user:', error);
        res.status(500).json({ error: Error.message });
    }
})




////


  

module.exports = userRouter;