import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset errors
    setErrors({ email: '', password: '', repeatPassword: '' });

    // Client-side validation
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required.';
    if (!form.password) newErrors.password = 'Password is required.';
    if (form.password !== form.repeatPassword) newErrors.repeatPassword = 'Passwords do not match.';

    // If there are validation errors, alert them and return early
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach(error => alert(error));
      setErrors(newErrors);
      return;
    }

    // Proceed with server-side registration
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

   
      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          // Alert errors from the server
      
          Object.values(data.errors).forEach(error => alert(error.message));
        
        } else {
          throw new Error(data.error || "Registration failed");
        }
        return;
      }

      alert('Registration successful!');
      navigate('/auth/login');
      setForm({ email: '', password: '', repeatPassword: '' });

    } catch (error) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="wrapper">
      <header>Register Here</header>
      <form onSubmit={handleSubmit}>
        <div className="field">
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
          </div>
        </div>
        <div className="field">
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
          </div>
        </div>
        <div className="field">
          <div className="input-area">
            <input
              type="password"
              name="repeatPassword"
              placeholder="Confirm Password"
              value={form.repeatPassword}
              onChange={handleChange}
              required
            />
            <i className="icon fas fa-lock"></i>
          </div>
        </div>
        <input type="submit" value="Register" />
      </form>
      <div className="sign-txt">
        Already a member? <a href="/auth/login">Login now</a>
      </div>
    </div>
  );
}
