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
import NavBar from "../components/navbar/navbar";
import CreatePaste from "../components/push_form_components/createPasteButton";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SavePaste from "../components/push_form_components/savePaste";
import { remove } from "firebase/database";

export default function PushForm(props) {
    const [userData, setUserData] = useState({
        pasteTitle: "", 
        pasteText: "", 
        expirationOption: "", 
        syntaxOption: "", 
        exposureOption: "Public", 
        pastePassword: "",
        pasteId: "",
        pasteUser: ""
    });

    const auth = getAuth(app);
    const user = auth.currentUser;
    const navigate = useNavigate();
    const location = useLocation();

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

    const updateUid = (uid) => {
            userData.pasteUser = uid;
    };

    const createPublicPaste = (id, db) => {
        if (userData.exposureOption === "Public") {
            const postListRef = ref(db, `/publicPastes/${id}`);
            set(postListRef, userData);
        } else {
            remove(ref(db, 'publicPastes/' + id));
        }
    }

    const createUserPaste = (id, db) => {
        if (user) {
            const uid = user.uid;
            const postListRef = ref(db, `/usersPastes/${uid}/${id}`);
            updateUid(uid);
            set(postListRef, userData);
        }
    }

    const createPaste = (event) => {
        event.preventDefault();
        try {
            const db = getDatabase(app);
            const postListRef = ref(db, 'allPastes');
            const newPostRef = push(postListRef);
            const id = newPostRef.key;
            createUserPaste(id, db);
            set(newPostRef, userData);
            createPublicPaste(id, db);
            navigate(`/${id}`);
        } catch (error) {
            console.error(error.message);
        }

    };

    const editPaste = () => {
        if (location.state) {
        setUserData({
            pasteTitle: location.state.pasteTitle, 
            pasteText: location.state.pasteText, 
            expirationOption: location.state.expirationOption, 
            syntaxOption: location.state.syntaxOption, 
            exposureOption: location.state.exposureOption, 
            pastePassword: location.state.pastePassword,
            pasteId: location.state.pasteId,
            pasteUser: location.state.pasteUser
        });}
    }

    useEffect(() => {
        editPaste();
    }, []);

    const savePaste = (event) => {
        event.preventDefault();
        try {
            const db = getDatabase(app);
            const postListRef = ref(db, `allPastes/${location.state.pasteId}`);
            createUserPaste(location.state.pasteId, db);
            set(postListRef, userData);
            createPublicPaste(location.state.pasteId, db);
            navigate(`/${location.state.pasteId}`);
        } catch (error) {
            console.error(error.message);
        }

    };

    return (
        <div>
            <NavBar />
            <form className = "form position-relative start-50 translate-middle-x mt-5" style = {{ width: "80%", maxWidth: "80%"}} onSubmit = {createPaste}>
                <MainTextArea userText = {userData.pasteText} onChange = {handleUserText}/>
                <div className = "optionsAreaHidden" id = "optionsArea">
                    <PasteTitle toDo = {handleTitle} title = {userData.pasteTitle}/>
                    <SyntaxHighlight toDo = {handleSyntax} sytaxValue = {userData.syntaxOption}/>
                    <PasteExpiration toDo = {handleExpiration} expirationOption = {userData.expirationOption}/>
                    <PasteExposure toDo = {handleExposure} exposureOption = {userData.exposureOption}/>
                    {user && <PastePassword toDo = {handlePassword} passwordInput = {userData.pastePassword}/>}
                    {!location.state && <CreatePaste toDo = {createPaste}/>}
                    {location.state && <SavePaste toDo = {savePaste}/>}
                </div>
            </form>
        </div>
    );
}