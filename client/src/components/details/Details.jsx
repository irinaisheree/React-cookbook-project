import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/userContext'; // Correct path

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const { user } = useAuth(); // Access userId from AuthContext
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState('');
    const [isLiked, setIsLiked] = useState(false); // Track if the recipe is liked by the user
    const [likeCount, setLikeCount] = useState(0); // Track the total number of likes
    const navigate = useNavigate();

    const userId = user?._id;

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:3000/recipes/${recipeId}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Failed to fetch recipe details');
    
                if (data && data.creator) {
                    // Set the initial recipe data
                    setRecipe(data);
                    // Determine if the user has liked the recipe
                    setIsLiked(data.likes.includes(userId)); 
                    // Set the initial like count
                    setLikeCount(data.likes.length); 
                } else {
                    setError('Recipe data is incomplete.');
                }
            } catch (err) {
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
        try {
            const token = localStorage.getItem('token');
            const likeUrl = `http://localhost:3000/recipes/${recipeId}/${isLiked ? 'unlike' : 'like'}`;
            const response = await fetch(likeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId }), // Only send userId
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Toggle the like state and adjust like count
                setIsLiked(prevIsLiked => !prevIsLiked);
                setLikeCount(prevLikeCount => prevLikeCount + (isLiked ? -1 : 1));
            } else {
                setError(data.error || 'Failed to like/unlike recipe');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        }
    };
    

    const handleEdit = () => {
        navigate(`/recipes/${recipeId}/edit`); // Redirect to the edit page
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this recipe?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/recipes/${recipeId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                alert('Recipe deleted successfully!');
                navigate('/recipes'); // Redirect to the recipes list
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
                    <p>{recipe.description}</p>
                    <p>Total Cost: ${recipe.totalCost}</p>
                    <p>Creator: {recipe.creator.email}</p>
                    <p>Likes: {likeCount}</p>

                    {/* Conditional Rendering of Buttons */}
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
                            <p>Please log in to like or edit recipes.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RecipeDetails;
