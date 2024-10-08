import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddRecipePage() {
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    description: '',
    ingredients: '',
    totalCost: '',
  });
  
  const [errors, setErrors] = useState({
    title: '',
    imageUrl: '',
    description: '',
    ingredients: '',
    totalCost: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { title: '', imageUrl: '', description: '', ingredients: '',totalCost: '' };

    if (!form.title) {
      newErrors.title = 'Please add Title';
      valid = false;
    }
    if (!form.description) {
      newErrors.description = 'Please add Description';
      valid = false;
    }
    if (!form.totalCost) {
      newErrors.totalCost = 'Please add Total Cost';
      valid = false;
    }

    if (!form.ingredients) {
        newErrors.ingredients = 'Please add the Ingredients';
        valid = false;
      }

      if (!form.imageUrl) {
        newErrors.imageUrl = 'Please add Image';
        valid = false;
      }


    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return; 

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        navigate('/recipes'); 
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
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
          />
             {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </label>
        <label>
          Ingredients:
          <input
            type="text"
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
          />
          {errors.ingredients && <p className="error">{errors.ingredients}</p>}
        </label>
        <label>
          Total Cost:
          <input
            type="number"
            name="totalCost"
            value={form.totalCost}
            onChange={handleChange}
          />
          {errors.totalCost && <p className="error">{errors.totalCost}</p>}
        </label>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
