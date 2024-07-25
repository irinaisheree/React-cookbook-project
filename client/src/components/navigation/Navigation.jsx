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
					<NavLink to="/">Home</NavLink>
				</li>

				<li>
					<NavLink to="/recepies">Recepies</NavLink>
				</li>

				{/* Conditional rendering based on authentication */}
				{!user ? (
					<>
						<li>
							<NavLink to="/about">About</NavLink>
						</li>
						<li>
							<NavLink to="/auth/login">Login</NavLink>
						</li>
						<li>
							<NavLink to="/auth/register">Register</NavLink>
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/profile">Profile</NavLink>
						</li>
						<li>
							<NavLink to="/add">Add Recipe</NavLink>
						</li>
						<li>
							<NavLink onClick={logout}>Logout</NavLink>
						</li>
					</>
				)}

				<li className="last">
					<NavLink to="/contact">Contact Us</NavLink>
				</li>
			</ul>
		</div>
	);
}

