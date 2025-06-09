import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.FINANCE_API_URL || 'http://localhost:3000'
});

export const signup = async (userData) => {
  try {
    const response = await client.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export const login = async (credentials) => {
  try {
    const response = await client.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}
