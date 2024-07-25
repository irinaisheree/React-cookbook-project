import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();


  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '' });

    if (!form.email) {
      setErrors((prev) => ({ ...prev, email: "Email can't be blank" }));
    }

    if (!form.password) {
      setErrors((prev) => ({ ...prev, password: "Password can't be blank" }));
    }

    if (form.email && form.password) {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Login failed');
        }

        alert('Login successful!');
            navigate('/')
      } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="wrapper">
      <header>Login Form</header>
      <form onSubmit={handleSubmit}>
        <div className="field email">
          <div className="input-area">
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <i className="icon fas fa-envelope"></i>
            {errors.email && <i className="error error-icon fas fa-exclamation-circle"></i>}
          </div>
          {errors.email && <div className="error error-txt">{errors.email}</div>}
        </div>
        <div className="field password">
          <div className="input-area">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <i className="icon fas fa-lock"></i>
            {errors.password && <i className="error error-icon fas fa-exclamation-circle"></i>}
          </div>
          {errors.password && <div className="error error-txt">{errors.password}</div>}
        </div>
        <div className="pass-txt">
          <a href="#">Forgot password?</a>
        </div>
        <input type="submit" value="Login" />
      </form>
      <div className="sign-txt">
        Not yet a member? <a href="#">Signup now</a>
      </div>
    </div>
  );
}
