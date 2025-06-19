export default function hasSession() {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
}
