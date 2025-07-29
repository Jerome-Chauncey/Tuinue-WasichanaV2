import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { signup } from '../api/fetchWithAuth';
import './CharitySignup.css';

const CharitySignup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup(form.email, form.password, 'charity');
    setMessage(response.message || response.error);
  };

  return (
    <div className="charity-signup-container">
      <main className="charity-signup-main">
        <div className="charity-signup-form">
          <h2>Charity Signup</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
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
            <button type="submit">Sign Up</button>
          </form>
          {message && <p>{message}</p>}
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CharitySignup;