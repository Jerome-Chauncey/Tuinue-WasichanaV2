import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DonorSignup from './pages/DonorSignup';
import CharitySignup from './pages/CharitySignup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/donor-signup" element={<DonorSignup />} />
      <Route path="/charity-signup" element={<CharitySignup />} />
    </Routes>
  );
}

export default App;