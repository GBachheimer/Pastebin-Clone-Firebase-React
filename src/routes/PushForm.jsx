import MainTextArea from "../components/push_form_components/userTextArea";
import SyntaxHighlight from "../components/push_form_components/pasteSyntax";
import PasteExpiration from "../components/push_form_components/pasteExpiration";
import PasteExposure from "../components/push_form_components/pasteExposure";
import PastePassword from "../components/push_form_components/pastePassword";
import PasteTitle from "../components/push_form_components/pasteTitle";
import { useState } from "react";
import "./PushForm.css";
import { getDatabase, ref, push, set } from "firebase/database";
import app from "../components/firebase";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

export default function PushForm(props) {
    const [userData, setUserData] = useState({
        pasteTitle: "", 
        pasteText: "", 
        expirationOption: "", 
        syntaxOption: "", 
        exposureOption: "", 
        pastePassword: ""
    });
    const handleUserText = (event) => {
        setUserData({...userData, pasteText: event.target.value});
        if (event.target.value !== "") {
            document.getElementById("optionsArea").className = "optionsAreaVisible";
        } else {
            document.getElementById("optionsArea").className = "optionsAreaHidden";
        }
    }
    const handleTitle = (event) => {
        setUserData({...userData, pasteTitle: event.target.value});
    }
    const handleExpiration = (event) => {
        setUserData({...userData, expirationOption: event.target.value});
    }
    const handleSyntax = (event) => {
        setUserData({...userData, syntaxOption: event.target.value});
    }
    const handleExposure = (event) => {
        setUserData({...userData, exposureOption: event.target.value});
    }
    const handlePassword = (event) => {
        setUserData({...userData, pastePassword: event.target.value});
    }
    let id = "";
    const handleFormSubmit = (event) => {
        event.preventDefault();
        try {
            const db = getDatabase(app);
            const postListRef = ref(db, 'allPastes');
            const newPostRef = push(postListRef);
            id = newPostRef.key;
            window.open(`/${id}`);
            set(newPostRef, userData);
        } catch (error) {
            console.error(error.message);
        }

    };
    return (
        <div>
            <NavBar />
            <form className = "form position-relative start-50 translate-middle-x mt-5" style = {{ width: "80%", maxWidth: "80%"}} onSubmit = {handleFormSubmit}>
                <MainTextArea userText = {userData.pasteText} onChange = {handleUserText}/>
                <div className = "optionsAreaHidden" id = "optionsArea">
                    <PasteTitle toDo = {handleTitle} title = {userData.pasteTitle}/>
                    <SyntaxHighlight toDo = {handleSyntax} sytaxValue = {userData.syntaxOption}/>
                    <PasteExpiration toDo = {handleExpiration} expirationOption = {userData.expirationOption}/>
                    <PasteExposure toDo = {handleExposure} exposureOption = {userData.exposureOption}/>
                    <PastePassword toDo = {handlePassword} passwordInput = {userData.pastePassword}/>
                    <div className = "d-grid gap-2 col-6 mx-auto">
                        <button className = "btn btn-outline-light rounded-pill my-4" type = "submit" >Create New Paste</button>
                    </div>
                </div>
                <Outlet />
            </form>
        </div>
    );
}