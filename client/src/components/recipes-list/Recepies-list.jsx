import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import styles from './Recepies-list.module.css';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("http://localhost:3000/recipes"); 
        if (!response.ok) {
          throw new Error("Failed to fetch recipes.");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);



  if (loading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.recipeList}>
      {recipes.length === 0 ? (
        <p className={styles.noRecipesText}>Add the first recipe!</p>
      ) : (
        recipes.map((recipe) => (
          <div className={styles.recipeItem} key={recipe._id}>
            <h3 className={styles.title}>{recipe.title}</h3>
            {recipe.imageUrl && <img className={styles.image} src={recipe.imageUrl} alt={recipe.title} />}
            <Link to={`/recipes/${recipe._id}`} className={styles.detailsButton}>Details</Link>
          </div>
        ))
      )}
    </div>
  );
}
