import { API_BASE_URL } from './config';

export const fetchWithAuth = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

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
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const signup = async (email, password, role) => {
  const response = await fetchWithAuth('api/signup', {  // Add 'api/' prefix
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  });
  if (response.redirect) window.location.href = response.redirect;
  return response;
};

export const login = async (email, password) => {
  try {
    const response = await fetchWithAuth('api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    console.log('Full login response:', response); // Debug log
    
    if ((response.success && response.access_token) || response.token) {
      const token = response.access_token || response.token;
      localStorage.setItem('token', token);
      
      if (response.redirect) {
        window.location.href = response.redirect;
      }
      return response;
    }
    
    throw new Error(response.message || 'Login failed');
  } catch (error) {
    console.error('Login error details:', {
      error,
      response: error.response
    });
    throw error;
  }
};