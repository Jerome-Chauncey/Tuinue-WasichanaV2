import { API_BASE_URL } from '../config';

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = new Error('Request failed');
    error.status = response.status;
    try {
      const errorData = await response.json();
      error.message = errorData.message || response.statusText;
    } catch {
      error.message = response.statusText || 'Unknown error';
    }
    throw error;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
};