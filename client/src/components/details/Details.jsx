import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/userContext'; // Correct path

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const { user, isLoggedIn, isOwner } = useAuth(); // Get user, isLoggedIn, and isOwner from context

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await fetch(`http://localhost:3000/recipes/${recipeId}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch recipe details.");
                }
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch recipe details. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchRecipe();
    }, [recipeId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!recipe) return <p>No recipe found.</p>;

    // Ensure the creator field is populated and contains the necessary details
    const creatorEmail = recipe.creator?.email;
    console.log(recipe.creator)

    return (
        <div className="recipe-details">
            <h1>{recipe.title}</h1>
            {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} />}
            <p>{recipe.description}</p>
            <p>Total Cost: ${recipe.totalCost}</p>
            <p>Creator: {creatorEmail}</p>

            {/* Conditional Rendering of Buttons */}
            <div className="recipe-actions">
                {isLoggedIn ? (
                    isOwner(recipe.creator?.email) ? (
                        <>
                            <Link to={`/recipes/${recipeId}/edit`} className="button edit-button">Edit</Link>
                            <Link to={`/recipes/${recipeId}/delete`} className="button delete-button">Delete</Link>
                        </>
                    ) : (
                        <Link to={`/recipes/try/${recipeId}`} className="button try-button">Try this Recipe</Link>
                    )
                ) : null}
            </div>
        </div>
    );
};

export default RecipeDetails;
