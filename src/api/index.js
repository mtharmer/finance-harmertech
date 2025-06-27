import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_FINANCE_API_URL || 'http://localhost:3001',
});

const unintercepted = client;

export function onRequestFulfilled(request) {
  const token = localStorage.getItem('token');
  request.headers.Authorization = token;
  return request;
}

export function onRequestFailed(error) {
  return Promise.reject(error);
}

client.interceptors.request.use(onRequestFulfilled, onRequestFailed);

export function onResponseFulfilled(response) {
  return response;
}

export function onResponseFailed(error) {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login'
  }
  return Promise.reject(error);
}

client.interceptors.response.use(onResponseFulfilled, onResponseFailed);

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

export const getMortgage = () => {
  return client.get('/mortgage');
}

export const createMortgage = (mortgage) => {
  return client.post('/mortgage', {mortgage: mortgage})
}

export const deleteMortgage = () => {
  return client.delete('/mortgage');
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

export const changePassword = (user) => {
  return client.put('/signup', user);
}
