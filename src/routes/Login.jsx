import NavBar from "../components/navbar/navbar";
import "./LogIn.css";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import app from "../components/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn(props) {
    const [message, setMessage] = useState("");

    const auth = getAuth(app);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = document.getElementById("emailLogIn");
        const password = document.getElementById("passwordLogIn");
        await signInWithEmailAndPassword(auth, email.value, password.value)
        .then((authUser) => {
            if (authUser.user.emailVerified) {
                handleSignInState();
            } else {
                document.getElementById("message").style.color = "#ff5e5e";
                setMessage("Email not verified.");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById("message").style.color = "#ff5e5e";
            if (error.code === "auth/user-not-found") {
                setMessage("Wrong email address.");
            } else if (error.code === "auth/invalid-email") {
                setMessage("Invalid email address.");
            } else if (error.code === "auth/wrong-password") {
                setMessage("Wrong password.");
            } else if (error.code === "auth/too-many-requests") {
                setMessage("Too many requests, please reset your password.");
            } else if (errorCode === "auth/user-not-found") {
                setMessage("This email is not registered.");
            } else {
                setMessage("Something is wrong, please try again. " + errorCode + " " + errorMessage);
            }
        });
    }

    const handleSignInState = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/user");
            }
        });
    }

    const resetPassword = () => {
        const email = document.getElementById("emailLogIn").value;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                document.getElementById("message").style.color = "#9cff6e";
                setMessage("An email to reset your password was sent!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                document.getElementById("message").style.color = "#ff5e5e";
                if (errorCode === "auth/missing-email") {
                    setMessage("This email is not registered.");
                } else if (errorCode === "auth/user-not-found") {
                    setMessage("This email is not registered.");
                } else {
                    setMessage(errorCode + " " + errorMessage);
                }
            });
    }

    return (
        <div>
            <NavBar />
            <form className = "signUpForm">
                <fieldset className = "fieldSetLogIn">
                    <label className = "input labelStyle" htmlFor = "emailLogIn" id = "emailLogInLabel">Email Address:</label>
                    <input className = "input" type = "email" id = "emailLogIn" name = "emailLogIn" placeholder = "example@gmail.com" required/>
                    <label className = "input labelStyle" htmlFor = "passwordLogIn" id = "passwordLogInLabel">Password:</label>
                    <input className = "input" type = "password" id = "passwordLogIn" name = "passwordLogIn" required/>
                    <p id = "message" style = {{textAlign: "center", marginTop: "1vw"}}>{message}</p>
                    <button className = "button" type = "submit" onClick = {handleSubmit}>Log In</button>
                </fieldset>
            </form>
            <p style = {{textAlign: "center", marginTop: "0.5vw", marginBottom: "0.5vw", color: "white"}}>
                Don't have an account? <Link to = "/signUp" className = "link">Sign Up</Link> <br/>
                <button type = "button" className = "resetPass" onClick = {resetPassword}>Reset password</button>
            </p>
        </div>
    );
}