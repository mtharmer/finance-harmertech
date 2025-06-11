import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_FINANCE_API_URL || 'http://localhost:3001'
});

export const debtList = async () => {
  const response = await client.get('/debts');
  return response.data;
}

export const createDebt = (debtData) => {
  return client.post('/debts/new', debtData);
}

export const updateDebt = (debtData) => {
  return client.put(`/debts/update/${debtData._id}`, debtData)
}

export const deleteDebt = (id) => {
  return client.delete(`/debts/delete/${id}`)
}
