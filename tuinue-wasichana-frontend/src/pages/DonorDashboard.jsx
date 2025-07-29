import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api/fetchWithAuth';
import Footer from '../components/Footer';
import './DonorDashboard.css';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithAuth('/donor-dashboard/1'); // Hardcoded user_id for now
        setDonations(response.donations);
      } catch (err) {
        setError(err.message || 'Failed to fetch donations');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="donor-dashboard-container">
      <main className="donor-dashboard-main">
        <h2>Donor Dashboard</h2>
        <h3>Donation History</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Charity ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.id}</td>
                <td>{donation.charity_id}</td>
                <td>${donation.amount}</td>
                <td>{donation.date}</td>
                <td>{donation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
};

export default DonorDashboard;