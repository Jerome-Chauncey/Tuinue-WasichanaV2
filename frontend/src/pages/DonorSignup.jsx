import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api";
import Button from '../components/Button';
import Card from '../components/Card';

const DonorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    charity: "",
    amount: "",
    frequency: "one-time",
    anonymous: false,
  });
  const [charities, setCharities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "donor") {
      navigate("/donor-dashboard");
      return;
    }

    const fetchCharities = async () => {
      try {
        const data = await fetchWithAuth('/charities');
        setCharities(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCharities();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, charity, amount, frequency, anonymous } = formData;

    if (!name || !email || !password || !charity || !amount) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const selectedCharity = charities.find(c => c.name === charity);
      if (!selectedCharity) {
        throw new Error("Selected charity not found");
      }
      const charityId = selectedCharity.id;

      await fetchWithAuth('/donor-signup', {
        method: "POST",
        body: JSON.stringify({ name, email, password, anonymous }),
      });

      const { token } = await fetchWithAuth('/login', {
        method: "POST",
        body: JSON.stringify({ email, password, role: "donor" }),
      });

      localStorage.setItem("token", token);
      localStorage.setItem("role", "donor");

      await fetchWithAuth('/donations', {
        method: "POST",
        body: JSON.stringify({
          charity_id: charityId,
          amount: parseFloat(amount),
          frequency,
          anonymous,
        }),
      });

      navigate("/thank-you");
    } catch (err) {
      if (err.status === 409) {
        setError("Email already registered");
      } else {
        setError(err.message || "Failed to process signup or donation");
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 font-['Lexend','Noto_Sans',sans-serif]">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">Tuinue Wasichana</h2>
        </header>
        <main className="flex-1 flex items-center justify-center px-4">
          <p className="text-red-600 text-base font-medium">Error: {error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 font-['Lexend','Noto_Sans',sans-serif]">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Tuinue Wasichana</h2>
      </header>
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Choose a Cause to Support</h1>
          <Card className="p-6">
            <div className="space-y-4">
              {charities.map((charity, index) => (
                <label key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="charity"
                    value={charity.name}
                    onChange={handleChange}
                    className="h-5 w-5 text-teal-500 focus:ring-teal-500"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{charity.name}</p>
                    <p className="text-gray-600 text-sm">
                      {charity.description || `Support ${charity.name} in empowering girls.`}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Your Donation</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">Name</label>
                <input
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-2">Amount</label>
                <input
                  name="amount"
                  type="number"
                  placeholder="$0"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-800 font-medium mb-2">Donation Frequency</label>
                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    name="frequency"
                    value="one-time"
                    checked={formData.frequency === "one-time"}
                    onChange={handleChange}
                    className="h-5 w-5 text-teal-500 focus:ring-teal-500"
                  />
                  <span className="text-gray-800">One-time</span>
                </label>
                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    name="frequency"
                    value="monthly"
                    checked={formData.frequency === "monthly"}
                    onChange={handleChange}
                    className="h-5 w-5 text-teal-500 focus:ring-teal-500"
                  />
                  <span className="text-gray-800">Monthly</span>
                </label>
              </div>
              <label className="flex items-center gap-4">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleChange}
                  className="h-5 w-5 text-teal-500 focus:ring-teal-500"
                />
                <span className="text-gray-800">Donate anonymously</span>
              </label>
              <Button type="submit" variant="secondary" className="w-full">Continue</Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DonorSignup;