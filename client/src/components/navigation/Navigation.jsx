import { Link, NavLink } from 'react-router-dom';

export default function Navigation() {
	return (
		<div id="header">
			<div>
				<a href="index.html"><img src="images/logo.gif" alt="Logo" /></a>
			</div>
			<ul>

				<li className="first current"> <NavLink
					to="/"
				>
					Home
				</NavLink></li>


				<li > <NavLink
					to="/about"
				>
					About
				</NavLink></li>


				<li > <NavLink
					to="/recepies"
				>
					Recepies
				</NavLink></li>

				<li>
					<NavLink
						to="/login"
					>
						Login
					</NavLink>
				</li>

				<li >	<NavLink
					to="/register"

				>
					Resgister
				</NavLink></li>

				<li className="last">
					<NavLink
						to="/contact"

					>
						Contact Us
					</NavLink>
				</li>

			</ul>
		</div>
	);
}