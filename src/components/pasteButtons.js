import { getAuth } from "firebase/auth";
import { remove } from "firebase/database";
import app from "./firebase";
import { getDatabase, ref } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import "./pasteButtons.css";
import Button from "./button";

export default function PasteButtons(props) {
    const auth = getAuth(app);
    const user = auth.currentUser;
    const db = getDatabase();
    const params = useParams();
    const navigate = useNavigate();

    function copyURL() {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
    }

    function copyText() {
        navigator.clipboard.writeText(props.data.pasteText);
    }

    function editText() {
        const uid = user.uid;
        navigate("/", {state:{
            pasteTitle: props.data.pasteTitle, 
            pasteText: props.data.pasteText, 
            expirationOption: props.data.expirationOption, 
            syntaxOption: props.data.syntaxOption, 
            exposureOption: props.data.exposureOption, 
            pastePassword: props.data.pastePassword,
            pasteId: params.id,
            pasteUser: uid
        }});
    }

    function deletePaste() {
        const uid = user.uid;
        remove(ref(db, 'usersPastes/' + uid + '/' + params.id))
        .then(remove(ref(db, 'allPastes/' + params.id)))
        .then(remove(ref(db, 'publicPastes/' + params.id)))
        .then(() => {
            document.getElementById("card").className = "shakeEffect text-center card my-2 position-relative";
            document.getElementById("card").style.marginLeft = "10vw";
        })
        .then(() => {
            setTimeout(() => navigate("/user"), 500);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    return (
        <div className = "text-center">
            <Button toDo = {copyURL} name = "Copy URL"/>
            <Button toDo = {copyText} name = "Copy text" />
            {user && (props.data.pasteUser == user.uid) && <Button toDo = {editText} name = "Edit"/>}
            {user && (props.data.pasteUser == user.uid) && <Button toDo = {deletePaste} name = "Delete"/>}
            {props.data.pastePassword && user && <p className = "my-2 text-light">Password: {props.data.pastePassword}</p>}
        </div>
    );
}