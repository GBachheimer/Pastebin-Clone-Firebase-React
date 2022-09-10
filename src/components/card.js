
import { getAuth } from "firebase/auth";
import PasteButtons from "./pasteButtons";
import app from "./firebase";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Card(props) {
    const colors = ["primary","secondary", "success", "danger", "warning", "info", "light", "dark"];
    const randomColor = Math.floor(Math.random() * 8);
    const auth = getAuth(app);
    const user = auth.currentUser;
    const informUser = () => {
        if (!user) {
            document.getElementById("inform1").innerHTML = "Consider creating an account to have all your pastes in one place and access to extra features.";
        }
        if (!user && (props.data.exposureOption === "Unlisted")) {
            document.getElementById("inform2").innerHTML = "WARNING! This paste is Unlisted. Save the link for future use.";
        }
    }
    useEffect(() => {
        informUser();
    }, []);

    return (
        <div>
            <div className = {`text-center card text-bg-${colors[randomColor]} my-2 position-relative start-50 translate-middle-x`} style = {{ width: "80%", maxWidth: "80%"}} id = "card">
                <div className = "card-header">{props.data.pasteTitle}</div>
                <div className = "card-body">
                    <p className = "card-text" id = "cardText">{props.data.pasteText}</p>
                </div>
            </div>
            <p className = "text-center text-light" id = "inform1"></p>
            <p className = "text-center text-light" id = "inform2"></p>
            <PasteButtons data = {props.data}/>
        </div>
    );
}