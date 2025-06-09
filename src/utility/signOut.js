import Session from "supertokens-web-js/recipe/session";

export default async function logout () {
  await Session.signOut(); 
  localStorage.removeItem("email"); // Clear any stored user data
  window.location.href = "/"; // or to wherever your logic page is
}
