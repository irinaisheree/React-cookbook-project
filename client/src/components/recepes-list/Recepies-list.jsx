import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeListPage({ recipes, onEdit, onDelete }) {
  return (
    <div className="recipe-list-page">
      <h2>Recipe List</h2>
      <div className="recipe-list">
        {recipes.map((recipe, index) => (
          <div className="recipe-item" key={index}>
            <h3>{recipe.title}</h3>
            {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} />}
            <p>{recipe.description}</p>
            <p>Total Cost: ${recipe.totalCost}</p>
            <p>Creator: {recipe.creator}</p>
            <button onClick={() => onEdit(index)}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
      <Link to="/add-recipe">
        <button>Add Recipe</button>
      </Link>
    </div>
  );
}