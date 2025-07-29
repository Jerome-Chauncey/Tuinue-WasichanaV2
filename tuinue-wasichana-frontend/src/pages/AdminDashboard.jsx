import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api/fetchWithAuth';
import Footer from '../components/Footer';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [data, setData] = useState({ donations: [], charities: [], users: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithAuth('/admin-dashboard');
        setData(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch admin data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard-container">
      <main className="admin-dashboard-main">
        <h2>Admin Dashboard</h2>
        <h3>Donations</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Donor ID</th>
              <th>Charity ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.id}</td>
                <td>{donation.donor_id}</td>
                <td>{donation.charity_id}</td>
                <td>${donation.amount}</td>
                <td>{donation.date}</td>
                <td>{donation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Charities</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.charities.map((charity) => (
              <tr key={charity.id}>
                <td>{charity.id}</td>
                <td>{charity.name}</td>
                <td>{charity.email}</td>
                <td>{charity.status}</td>
                <td>{charity.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Users</h3>
        <ul>
          {Object.entries(data.users).map(([email, user]) => (
            <li key={email}>{email}: {user.role}</li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;