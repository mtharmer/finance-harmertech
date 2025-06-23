import { changePassword } from "../api";
import { alert } from "./notifications";

export default async function passwordChange(email, currentPassword, password, passwordConfirmation) {
  try {
    await changePassword({
      user: {
        email: email,
        currentPassword: currentPassword,
        password: password,
        passwordConfirmation: passwordConfirmation
      }
    });
    localStorage.removeItem('token')
    window.location.href = "/login";
  } catch (error) {
    if (err.status === 422) {
      alert('Invalid credentials, please try again!');
    } else {
      alert("Oops! Something went wrong.");
    }
  }
}
