import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../details/Details"

export default function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
      
        const response = await fetch(`http://localhost:3000/recipes/${recipeId}`); // Replace with your API endpoint
        console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details.");
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        console.log(err)
        setError("Failed to fetch recipe details. Please try again later.");

      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return <div>Loading recipe details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={"recipe-details"}>
  <h1>{recipe.title}</h1>
  {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} />}
  <p>{recipe.description}</p>
  <p>Total Cost: ${recipe.totalCost}</p>
  <p>Creator: {recipe.creatorEmail}</p>
  
  <div className="recipe-actions">
    <Link to={`/recipes/edit/${recipe._id}`} className="button edit-button">Edit</Link>
    <Link to={`/recipes/delete/${recipe._id}`} className="button delete-button">Delete</Link>
  </div>
</div>

  );
}