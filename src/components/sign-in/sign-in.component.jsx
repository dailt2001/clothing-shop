import { useState } from "react";
import {
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import "./sign-in.scss";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const response = await signInWithGooglePopup();
        await createUserDocumentFromAuth(response.user);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { user } = await signInUserWithEmailAndPassword(
                email,
                password
            );
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                case "auth/wrong-password":
                    alert("Incorrect password!");
                    break;
                default:
                    console.log(error);
            }
            console.log("Error when sign in user", error);
        }
    };

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className="buttons-container">
                    <Button buttonType={"inverted"} type="submit">
                        Sign In
                    </Button>
                    <Button type='button' buttonType={"google"} onClick={signInWithGoogle}>
                        Google Sign in
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
