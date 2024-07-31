import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/userContext'; // Adjust path as needed
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Profile = () => {
  const { user, isLoggedIn } = useAuth();
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [addedRecipes, setAddedRecipes] = useState([]);
  const [cookedStatus, setCookedStatus] = useState({});

  useEffect(() => {
    if (!user || !isLoggedIn) return;

    async function fetchUserData() {
      try {
        const token = localStorage.getItem('token');

        // Fetch liked recipes
        const likedResponse = await fetch(`http://localhost:3000/users/${user._id}/likedRecipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const likedData = await likedResponse.json();
        setLikedRecipes(likedData);

        // Fetch added recipes
        const addedResponse = await fetch(`http://localhost:3000/users/${user._id}/addedRecipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const addedData = await addedResponse.json();
        setAddedRecipes(addedData);

        // Load cooked status from localStorage
        const storedStatus = JSON.parse(localStorage.getItem(`cookedStatus_${user._id}`)) || {};
        setCookedStatus(storedStatus);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [user, isLoggedIn]);

  const handleCookedStatusChange = async (recipeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/users/${user._id}/checkedRecipes/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCookedStatus(prevStatus => {
          const newStatus = { ...prevStatus, [recipeId]: !prevStatus[recipeId] };
          localStorage.setItem(`cookedStatus_${user._id}`, JSON.stringify(newStatus));
          return newStatus;
        });
      } else {
        console.error('Error updating cooked status:', await response.text());
      }
    } catch (error) {
      console.error('Error updating cooked status:', error);
    }
  };

  return (
    <div className="profile-page">
      <h1>{user.email}'s Profile</h1>
      <div className="profile-content">
        <div className="profile-section">
          <h2>What to Cook List</h2>
          <ul>
            {likedRecipes.map(recipe => (
              <li key={recipe._id}>
                <div className="recipe-info">
                  <Link to={`/recipes/${recipe._id}`}>
                    <img src={recipe.imageUrl} alt={recipe.title} />
                  </Link>
                  <p>{recipe.title}</p>
                </div>
                <input
                  type="checkbox"
                  checked={!!cookedStatus[recipe._id]}
                  onChange={() => handleCookedStatusChange(recipe._id)}
                />
                 <p>Cooked</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-section">
          <h2>Added Recipes</h2>
          <ul>
            {addedRecipes.map(recipe => (
              <li key={recipe._id}>
                <div className="recipe-info">
                  <Link to={`/recipes/${recipe._id}`}>
                    <img src={recipe.imageUrl} alt={recipe.title} />
                  </Link>
                  <p>{recipe.title}</p>
                  <p className="likes-count">Added to lists: {recipe.likes?.length || 0}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;