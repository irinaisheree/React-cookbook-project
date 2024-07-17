import { Link, NavLink } from 'react-router-dom';

export default function Navigation(){
  return (
    <div id="header">
			<div>
				<a href="index.html"><img src="images/logo.gif" alt="Logo" /></a>
			</div>
			<ul>
				<li className="first current"><a href="index.html">Home</a></li>
				<li><a href="recipes.html">Recipes</a></li>
				<li><a href="about.html">About us</a></li>
				{/* <li><a href="add.html">Add a recipe</a></li> */}
				<li><a href="login.html">Login</a></li>
				<li><a href="index.html">Register</a></li>
				<li className="last"><a href="contact.html">Contact Us</a></li>
			</ul>
		</div>
  );
}