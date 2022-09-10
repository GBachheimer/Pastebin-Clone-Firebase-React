import NavBar from "../components/navbar/navbar";
import "./SignUp.css";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { useState } from "react";
import app from "../components/firebase";
import { Link } from "react-router-dom";

export default function SignUp(props) {
    const [errorMessage, setErrorMessage] = useState("");

    const auth = getAuth(app);

    const checkPassword = () => {
        const firstPassword = document.getElementById("password");
        const secondPassword = document.getElementById("repeatPassword");
        if (firstPassword.value !== secondPassword.value) {
            secondPassword.style.color = "red";
            secondPassword.value = "Wrong password!";
            secondPassword.type = "text";
            return true;
        }
        return false;
    }

    const handleOnFocus = () => {
        const secondPassword = document.getElementById("repeatPassword");
        secondPassword.style.color = "black";
        secondPassword.value = "";
        secondPassword.type = "password";
    }

    const onSuccessfulSubmit = () => {
        sendEmailVerification(auth.currentUser)
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
            document.getElementById("message").style.color = "#ff5e5e";
            setErrorMessage("Something went wrong.");
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (checkPassword()) {
            return;
        }
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        await createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            document.getElementById("message").style.color = "#9cff6e";
            const fields = document.querySelectorAll("#firstName, #firstNameLabel, #lastName, #lastNameLabel, #email, #emailLabel, #password, #passwordLabel, #repeatPassword, #repeatPasswordLabel, #submitButton");
            fields.forEach((field) => {
                field.classList.add('hide');
            });
            setErrorMessage("Please verify your email address.");
            onSuccessfulSubmit();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
            document.getElementById("message").style.color = "#ff5e5e";
            if (errorCode === "auth/email-already-in-use") {
                setErrorMessage("This email is already in use.");
            } else if(errorCode === "auth/invalid-email") {
                setErrorMessage("This email is not valid.");
            } else {
                setErrorMessage("Please fill all the fields.");
            }
        });
    }

    return (
        <div>
            <NavBar />
            <form className = "signUpForm">
                <fieldset className = "fieldSet">
                    <label className = "input labelStyle" htmlFor = "firstName" id = "firstNameLabel">First Name:</label>
                    <input className = "input" type = "text" id = "firstName" name = "firstName" placeholder = "John" autoFocus/>
                    <label className = "input labelStyle" htmlFor = "lastName" id = "lastNameLabel">Last Name:</label>
                    <input className = "input" type = "text" id = "lastName" name = "lastName" placeholder = "Smith"/>
                    <label className = "input labelStyle" htmlFor = "email" id = "emailLabel">Email Address:</label>
                    <input className = "input" type = "email" id = "email" name = "email" placeholder = "example@gmail.com" required/>
                    <label className = "input labelStyle" htmlFor = "password" id = "passwordLabel">Password:</label>
                    <input className = "input" type = "password" id = "password" name = "password" required/>
                    <label className = "input labelStyle" htmlFor = "repeatPassword" id = "repeatPasswordLabel">Confirm Password:</label>
                    <input className = "input" type = "password" id = "repeatPassword" name = "password" required onFocus = {handleOnFocus}/>
                    <p style = {{textAlign: "center", marginTop: "1vw", color: "#ff5e5e"}} id = "message">{errorMessage}</p>
                    <button className = "button" type = "submit" onClick = {handleSubmit} id = "submitButton">Sign Up</button>
                </fieldset>
            </form>
            <div className = "loginLink">
                <p>Already have an account? 
                    <Link to = "/logIn" className = "link"> Log In</Link>
                    <br />
                    <button type = "button" className = "resendEmail" onClick = {onSuccessfulSubmit}>Resend verification email</button>
                </p>
            </div>
        </div>
        
    );
}