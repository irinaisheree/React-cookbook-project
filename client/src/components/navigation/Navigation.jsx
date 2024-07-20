import { Link, NavLink } from 'react-router-dom';

export default function Navigation(){
  return (
    <div id="header">
			<div>
				<a href="index.html"><img src="images/logo.gif" alt="Logo" /></a>
			</div>
			<ul>
				{/* <li className="first current"><a href="index.html">Home</a></li> */}
				<li className="first current"> <NavLink
                        to="/"
                        className={({ isActive }) => `text-sm font-semibold leading-6 text-gray-900${isActive ? ' underline' : ''}`}
                    >
                        Home
                    </NavLink></li>
				<li > <NavLink 
                        to="/about"
                        className={({ isActive }) => `text-sm font-semibold leading-6 text-gray-900${isActive ? ' underline' : ''}`}
                    >
                        About
                    </NavLink></li>
				
				
				<li>
				<NavLink
                        to="/login"
                        className={({ isActive }) => `text-sm font-semibold leading-6 text-gray-900${isActive ? ' underline' : ''}`}
                    >
                        Login
                    </NavLink>
				</li>

				<li >	<NavLink
                        to="/register"
                        className={({ isActive }) => `text-sm font-semibold leading-6 text-gray-900${isActive ? ' underline' : ''}`}
                    >
                        Resgister
                    </NavLink></li>
				
				<li className="last">
					<NavLink
                        to="/contact"
                        className={({ isActive }) => `text-sm font-semibold leading-6 text-gray-900${isActive ? ' underline' : ''}`}
                    >
                        Contact Us
                    </NavLink>
				</li>
					
			</ul>
		</div>
  );
}