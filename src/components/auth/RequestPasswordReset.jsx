import { useState } from 'react';
import { requestPasswordReset } from '../../api';

export default function RequestPasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await requestPasswordReset(email);
      setMessage('If that email address is registered, you will receive a password reset link shortly.');
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="flex justify-center mx-16 p-8 shadow-md shadow-slate-700">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Request Password Reset</h1>
        <p className="text-sm text-gray-600">{message}</p>
        {message == '' && (<><input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Request Reset</button>
        </>)}
      </form>
    </div>
  );
}
