import signIn from '../../utility/signIn';
import { useRef } from "react";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    signIn(emailRef.current.value, passwordRef.current.value);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              ref={emailRef}
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              data-testid='login-email-input'
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              ref={passwordRef}
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
              data-testid='login-password-input'
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid='login-save-button'
          >
            Login
          </button>
          <button type="button" className="w-full mt-4 cursor-pointer text-blue-600 hover:underline" onClick={() => window.location.href = '/password/reset'}>
            Forgot Password?
          </button>
        </form>
      </div>
    </div>
  );
}
