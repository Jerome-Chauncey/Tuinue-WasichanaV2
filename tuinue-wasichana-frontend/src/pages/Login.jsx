import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { login } from '../api/fetchWithAuth';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await login(form.email, form.password);
    console.log('Login response in component:', response); // Debug log
    
    if (response.success || response.token) {
      setMessage(response.message || 'Login successful');
      // Redirect happens automatically from fetchWithAuth
    } else {
      setMessage(response.message || 'Login failed - no token received');
    }
  } catch (error) {
    setMessage(error.message || 'Login failed. Please try again.');
    console.error('Detailed login error:', {
      error,
      email: form.email,
      time: new Date().toISOString()
    });
  }
};
  return (
    <div className="login-container">
      <main className="login-main">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
          <p>Don’t have an account? <Link to="/donor-signup">Sign up</Link></p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;