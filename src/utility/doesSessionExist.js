import Session from 'supertokens-web-js/recipe/session';

export default async function doesSessionExist() {
    if (await Session.doesSessionExist()) {
        console.log("Session exists");
        // you can also check if the session is valid
        // await Session.attemptRefreshingSession();
        // user is logged in
        return true;
    } else {
        // user has not logged in yet
        console.log("Session does not exist");
        localStorage.removeItem("userId");
        // you can redirect to the login page or show a message
        // window.location.href = "/login";
        return false;
    }
}
