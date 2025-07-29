import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../api/fetchWithAuth';
import CharityCard from '../components/CharityCard';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const data = await fetchWithAuth('/charities');
        setCharities(data.slice(0, 3));
      } catch (err) {
        setError(err.message || 'Failed to fetch charities');
      } finally {
        setLoading(false);
      }
    };
    fetchCharities();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
      <main className="home-main">
        <section className="home-section hero">
          <div>
            <h1>Empowering Girls Through Education</h1>
            <p>Join us in supporting girls' education and well-being in sub-Saharan Africa.</p>
            <Link to="/donor-signup">Donate Now</Link>
          </div>
        </section>
        <section className="home-section">
          <h2>Our Impact</h2>
          <p>Tuinue Wasichana creates opportunities for girls in sub-Saharan Africa through education and resources.</p>
        </section>
        <section className="home-section">
          <h2>Featured Charities</h2>
          {charities.map((charity) => (
            <CharityCard key={charity.id} {...charity} />
          ))}
        </section>
        <section className="home-section">
          <h2>Apply to be a Charity</h2>
          <p>Join our network to receive recurring donations.</p>
          <Link to="/apply-charity" className="apply-link">Apply Now</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;