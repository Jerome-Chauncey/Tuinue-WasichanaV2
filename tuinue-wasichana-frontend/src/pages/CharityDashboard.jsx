import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api/fetchWithAuth';
import Footer from '../components/Footer';
import './CharityDashboard.css';

const CharityDashboard = () => {
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithAuth('/charity-dashboard/1'); // Hardcoded user_id for now
        setCharity(response.charity);
      } catch (err) {
        setError(err.message || 'Failed to fetch charity info');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!charity) return <p>No charity data available</p>;

  return (
    <div className="charity-dashboard-container">
      <main className="charity-dashboard-main">
        <h2>Charity Dashboard</h2>
        <p><strong>Name:</strong> {charity.name}</p>
        <p><strong>Email:</strong> {charity.email}</p>
        <p><strong>Description:</strong> {charity.description}</p>
        <p><strong>Status:</strong> {charity.status}</p>
        <p><strong>Created At:</strong> {charity.created_at}</p>
      </main>
      <Footer />
    </div>
  );
};

export default CharityDashboard;