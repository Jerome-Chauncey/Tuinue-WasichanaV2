import { API_BASE_URL } from '../config/api';

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // Remove leading slash from endpoint if present to avoid duplication
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const response = await fetch(`${API_BASE_URL}/${cleanEndpoint}`, {
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