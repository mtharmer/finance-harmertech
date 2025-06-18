import { signOut } from "supertokens-web-js/recipe/session";

export default async function logout () {
  await signOut();
  window.location.href = "/";
}
