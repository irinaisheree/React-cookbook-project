import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/userContext'; 

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const { user } = useAuth(); // Access userId from AuthContext
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState('');
    const [isLiked, setIsLiked] = useState(false); // Check if the recipe is liked by the user
    const [likeCount, setLikeCount] = useState(0); // Check the total number of likes
    const navigate = useNavigate();

    const userId = user?._id;

    useEffect(() => {
        console.log('Fetching recipe details...');
        
        const fetchRecipe = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/recipes/${recipeId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Failed to fetch recipe details');

                if (data && data.creator) {
                    setRecipe(data);
                    console.log('Recipe data:', data);

                    // Check if the current user's ID is present in the likes array
                    const userLiked = data.likes.some(like => like._id === userId);
             
                    setIsLiked(userLiked);
                    setLikeCount(data.likes.length);
                } else {
                    setError('Recipe data is incomplete.');
                }
            } catch (err) {
                console.error('Error fetching recipe:', err);
                setError(err.message);
            }
        };

        fetchRecipe();
    }, [recipeId, userId]);

    const handleLike = async () => {
        if (!userId) {
            setError('You must be logged in to like recipes.');
            return;
        }

        console.log(`User ${isLiked ? 'unliking' : 'liking'} the recipe...`);

        try {
            const token = localStorage.getItem('token');
            const likeUrl = `http://localhost:3000/recipes/${recipeId}/${isLiked ? 'unlike' : 'like'}`;
            const response = await fetch(likeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsLiked(!isLiked);
                const newLikeCount = likeCount + (isLiked ? -1 : 1);
                setLikeCount(newLikeCount);
                console.log('New like count:', newLikeCount);
            } else {
                setError(data.error || 'Failed to like/unlike recipe');
            }
        } catch (err) {
            console.error('Error liking/unliking recipe:', err);
            setError('An unexpected error occurred.');
        }
    };

    const handleEdit = () => {
        console.log('Navigating to edit page...');
        navigate(`/recipes/${recipeId}/edit`); 
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this recipe?')) return;

        console.log('Deleting recipe...');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/recipes/${recipeId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                console.log('Recipe deleted successfully');
                alert('Recipe deleted successfully!');
                navigate('/recipes'); 
            } else {
                const contentType = response.headers.get('content-type');
                let errorMessage = 'Failed to delete recipe';

                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    errorMessage = data.error || errorMessage;
                }

                throw new Error(errorMessage);
            }
        } catch (err) {
            console.error('Error deleting recipe:', err);
            setError(err.message);
        }
    };

    return (
        <div className="recipe-details">
        {error && <p className="error">{error}</p>}
        {recipe ? (
            <>
                <h1>{recipe.title}</h1>
                {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} />}
                
       
                <div className="recipe-details-content">
                    <div className="recipe-details-left">
                        <p className="description">How to cook it: {recipe.description}</p>
                    </div>
                    <div className="recipe-details-right">
                        <p className="ingredients">Ingredients: {recipe.ingredients}</p>
                    </div>
                </div>
                
          
                <p>Total Cost: ${recipe.totalCost}</p>
                <p>Creator: {recipe.creator.email}</p>
                <p>People who will try this recipe: {likeCount}</p>
    
           
                <div className="recipe-actions">
                    {userId ? (
                        <>
                            {isLiked ? (
                                <button className="button try-button" onClick={handleLike}>
                                    Added to List
                                </button>
                            ) : (
                                <button className="button try-button" onClick={handleLike}>
                                    Try this Recipe
                                </button>
                            )}
                            {recipe.creator._id === userId && (
                                <>
                                    <button className="button edit-button" onClick={handleEdit}>
                                        Edit
                                    </button>
                                    <button className="button delete-button" onClick={handleDelete}>
                                        Delete
                                    </button>
                                </>
                            )}
                        </>
                    ) : (
                        <h2>Please log in to add or like recipes.</h2>
                    )}
                </div>
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    )    
};

export default RecipeDetails;
