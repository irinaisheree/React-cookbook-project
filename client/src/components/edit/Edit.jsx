import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Edit() {
  const { recipeId } = useParams();
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    description: '',
    totalCost: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(`http://localhost:3000/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details.');
        }
        const data = await response.json();
        setForm({
          title: data.title,
          imageUrl: data.imageUrl,
          description: data.description,
          totalCost: data.totalCost,
        });
      } catch (err) {
        console.error(err);
        setError('Failed to fetch recipe details. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/recipes/${recipeId}/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        navigate(`/recipes/${recipeId}`); // Redirect to the recipe details page after updating
      } else {
        console.error('Error updating recipe:', await response.text());
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-recipe-page">
      <h2>Edit Recipe</h2>
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
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}
