import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './ApplyCharity.css';

const ApplyCharity = () => {
  const [form, setForm] = useState({ name: '', email: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Charity application submitted:', form);
  };

  return (
    <div className="apply-charity-container">
      <main className="apply-charity-main">
        <div className="apply-charity-form">
          <h2>Apply to be a Charity</h2>
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
              <label>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <button type="submit">Submit Application</button>
          </form>
          <p>Back to <Link to="/">Home</Link></p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplyCharity;