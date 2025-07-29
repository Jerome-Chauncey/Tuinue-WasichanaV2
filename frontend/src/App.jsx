import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DonorSignup from './pages/DonorSignup';
import CharitySignup from './pages/CharitySignup';
import Login from './pages/Login';
import ThankYou from './pages/ThankYou';
import AdminDashboard from './pages/AdminDashboard';
import DonorDashboard from './pages/DonorDashboard';
import CharityDashboard from './pages/CharityDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/donor-signup" element={<DonorSignup />} />
      <Route path="/charity-signup" element={<CharitySignup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/donor-dashboard" element={<DonorDashboard />} />
      <Route path="/charity-dashboard" element={<CharityDashboard />} />
    </Routes>
  );
}

export default App;