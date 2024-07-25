import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddRecipePage() {
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    description: '',
    totalCost: '',
    creator: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        navigate('/recipes'); // Redirect to the recipes page after adding
      } else {
        console.error('Error adding recipe:', await response.text());
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
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
    </div>
  );
}
