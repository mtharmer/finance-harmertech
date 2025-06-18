import { signIn } from "supertokens-web-js/recipe/emailpassword";
import { alert } from "./notifications";

export default async function signInClicked(email, password) {
    try {
        let response = await signIn({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax).
                    alert(formField.error)
                }
            })
        } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
            alert("Email password combination is incorrect.")
        } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign in was not allowed.
            alert(response.reason)
        } else {
            // sign in successful. The session tokens are automatically handled by
            // the frontend SDK.
            window.location.href = "/";
        }
    } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            alert(err.message);
        } else {
            alert("Oops! Something went wrong.");
        }
    }
}
