import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_FINANCE_API_URL || 'http://localhost:3001',
});

const unintercepted = client;

client.interceptors.request.use(function (request) {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = token;
  }
  return request;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor to handle global errors
client.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login'
  }
  return Promise.reject(error);
});

export const debtList = async () => {
  return await client.get('/debts');
}

export const createDebt = (debtData) => {
  return client.post('/debts', {debt: debtData});
}

export const updateDebt = (debtData) => {
  return client.put(`/debts/${debtData.id}`, {debt: debtData})
}

export const deleteDebt = (id) => {
  return client.delete(`/debts/${id}`)
}

export const monthlyExpenseList = () => {
  return client.get('/monthly_expenses')
}

export const createMonthlyExpense = (monthlyExpense) => {
  return client.post('/monthly_expenses', {monthlyExpense: monthlyExpense})
}

export const updateMonthlyExpense = (monthlyExpense) => {
  return client.put(`/monthly_expenses/${monthlyExpense.id}`, {monthlyExpense: monthlyExpense})
}

export const deleteMonthlyExpense = (id) => {
  return client.delete(`/monthly_expenses/${id}`)
}

export const login = (user) => {
  return unintercepted.post('/login', user);
}

export const signup = (user) => {
  return unintercepted.post('/signup', user);
}

export const logout = () => {
  return client.delete('/logout');
}
