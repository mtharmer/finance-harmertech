import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_FINANCE_API_URL || 'http://localhost:3001'
});

export const debtList = async () => {
  return await client.get('/debts', {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  });
}

export const createDebt = (debtData) => {
  return client.post('/debts', {debt: debtData}, {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  });
}

export const updateDebt = (debtData) => {
  return client.put(`/debts/${debtData.id}`, {debt: debtData}, {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  })
}

export const deleteDebt = (id) => {
  return client.delete(`/debts/${id}`, {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  })
}

export const login = (user) => {
  return client.post('/login', user);
}

export const signup = (user) => {
  return client.post('/signup', user);
}

export const logout = () => {
  return client.delete('/logout', {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  });
}
