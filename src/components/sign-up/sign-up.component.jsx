import { useState } from "react";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import './sign-up.scss';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password do not match!");
            return;
        }

        try {
            const response = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(response.user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            }
            console.log("Error when sign up user", error);
        }
    };

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={"Display Name"}
                    type="text"
                    required
                    value={displayName}
                    onChange={changeHandler}
                    name="displayName"
                />
                
                <FormInput
                    label={"Email"}
                    type="email"
                    required
                    value={email}
                    onChange={changeHandler}
                    name="email"
                />

                <FormInput
                    label={"Password"}
                    type="password"
                    required
                    value={password}
                    onChange={changeHandler}
                    name="password"
                />

                <FormInput
                    label={"Confirm Password"}
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={changeHandler}
                    name="confirmPassword"
                />
                <Button buttonType={'inverted'} type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUp;
