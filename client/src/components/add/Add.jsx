import React, { useState } from 'react';


export default function Add() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    description: '',
    totalCost: '',
    creator: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecipes([...recipes, form]);
    setForm({
      title: '',
      imageUrl: '',
      description: '',
      totalCost: '',
      creator: ''
    });
  };

  const handleEdit = (index) => {
    const recipeToEdit = recipes[index];
    setForm(recipeToEdit);
    setRecipes(recipes.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    setRecipes(recipes.filter((_, i) => i !== index));
  };

  return (
    <div className="add-recipe-page">
      <h2>Add a New Recipe</h2>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Total Cost:
          <input
            type="number"
            name="totalCost"
            value={form.totalCost}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Creator:
          <input
            type="text"
            name="creator"
            value={form.creator}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Recipe</button>
      </form>

      <div className="recipe-list">
        {recipes.map((recipe, index) => (
          <div className="recipe-item" key={index}>
            <h3>{recipe.title}</h3>
            {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} />}
            <p>{recipe.description}</p>
            <p>Total Cost: ${recipe.totalCost}</p>
            <p>Creator: {recipe.creator}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};


