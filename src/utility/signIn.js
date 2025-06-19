import { alert } from "./notifications";
import { login } from "../api";

export default async function signInClicked(email, password) {
  try {
    let response = await login({
      user: {
        email: email,
        password: password
      }
    });

    localStorage.setItem('token', response.headers.getAuthorization())
    window.location.href = "/";
  } catch (err) {
    if (err.status === 422) {
      alert('Invalid credentials, please try again!');
    } else {
      alert("Oops! Something went wrong.");
    }
  }
}
