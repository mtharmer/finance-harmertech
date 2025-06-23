import { useRef } from "react";
import passwordChange from "../../utility/passwordChange";

export default function ChangePassword() {
  const emailRef = useRef();
  const currentPasswordRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    passwordChange(emailRef.current.value, currentPasswordRef.current.value, passwordRef.current.value, passwordConfirmationRef.current.value);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              ref={emailRef}
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your email address"
              required
              data-testid='password-change-email-input'
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Current Password</label>
            <input
              ref={currentPasswordRef}
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your current password"
              required
              data-testid='password-change-password-input'
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              ref={passwordRef}
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your new password"
              required
              data-testid='password-change-password-input'
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm New Password</label>
            <input
              ref={passwordConfirmationRef}
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your new password"
              required
              data-testid='password-change-password-input'
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid='password-change-save-button'
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
