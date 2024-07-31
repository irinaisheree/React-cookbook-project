import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/userContext'; // Import the custom hook


export default function Navigation() {
  const { user, logout } = useAuth(); // Get user and logout from context

  return (
    <div id="header">
      <div>
        <a href="index.html"><img src="images/logo.gif" alt="Logo" /></a>
      </div>
      <ul>
        <li className="first">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/recipes" className={({ isActive }) => isActive ? 'active' : ''}>
            Recipes
          </NavLink>
        </li>

        {!user ? (
          <>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth/login" className={({ isActive }) => isActive ? 'active' : ''}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth/register" className={({ isActive }) => isActive ? 'active' : ''}>
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" className={({ isActive }) => isActive ? 'active' : ''}>
                Add Recipe
              </NavLink>
            </li>
            <li>
              <NavLink onClick={logout} className="button">
                Logout
              </NavLink>
            </li>
          </>
        )}

        <li className="last">
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
            Contact Us
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
