import { logout } from "../api";

export default async function signOut () {
  await logout();
  localStorage.removeItem('token');
  window.location.href = "/";
}
