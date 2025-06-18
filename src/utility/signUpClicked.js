import { signUp } from "supertokens-web-js/recipe/emailpassword";
import { alert } from "./notifications";

export default async function signUpClicked(email, password) {
    try {
        let response = await signUp({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validation
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax),
                    // or the email is not unique.
                    alert(formField.error)
                } else if (formField.id === "password") {
                    // Password validation failed.
                    // Maybe it didn't match the password strength
                    alert(formField.error)
                }
            })
        } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign up was not allowed.
            alert(response.reason)
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
            window.location.href = "/login"
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