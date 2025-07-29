import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetchWithAuth from '../../api/fetchWithAuth';
import Button from '../../components/Button';
import Card from '../../components/Card';

const Home = () => {
  const [charities, setCharities] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const data = await fetchWithAuth('/charities');
        setCharities(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCharities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Tuinue Wasichana</h1>
      </header>
      <main className="container mx-auto p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Charities</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {charities.map((charity) => (
              <Card key={charity.id} title={charity.name} description={charity.description} />
            ))}
          </div>
        </section>
        <Button onClick={() => navigate('/donor-signup')} label="Become a Donor" />
      </main>
    </div>
  );
};

export default Home;