import { useState } from 'react';
import { resetPassword } from '../../api';

export default function ResetPassword() {
  const token = new URLSearchParams(window.location.search).get('reset_password_token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await resetPassword(token, password);
      setMessage('Your password has been reset successfully. You can now log in with your new password.');
    } catch (err) {
      alert(err);
    }
  }

  function goToLogin() {
    window.location.href = '/login';
  }

  return (
    <div className="flex justify-center mx-16 p-8 shadow-md shadow-slate-700">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-sm text-gray-600">{message}</p>
        {message == '' ? (<><input
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Reset Password</button>
        </> ) : 
        <button type="button " className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" onClick={goToLogin}>Go to Login</button>
        }
      </form>
    </div>
  )
}
