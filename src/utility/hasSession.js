import { doesSessionExist } from 'supertokens-web-js/recipe/session';

export default async function hasSession() {
    if (await doesSessionExist()) {
        // you can also check if the session is valid
        // await Session.attemptRefreshingSession();
        // user is logged in
        return true;
    } else {
        // you can redirect to the login page or show a message
        // window.location.href = "/login";
        return false;
    }
}
