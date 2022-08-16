import NavBar from "../components/navbar";
import { useParams } from "react-router-dom";
import { getDatabase, ref, child, get, set } from "firebase/database";
import Card from "../components/card";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";

export default function UniquePage(props) {
    const [dataObtained, setDataObtained] = useState([]);
    let params = useParams();
    const dbRef = ref(getDatabase());
    function dataTransfer() {  
        get(child(dbRef, `allPastes/${params.id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setDataObtained(snapshot.val());
            }
        }).catch((error) => {
            console.error(error);
        });
    };
    useEffect(() => {
        dataTransfer();
    }, []);
    function copyURL() {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
    }
    function copyText() {
        navigator.clipboard.writeText(dataObtained.pasteText);
    }
    return (
        <div >
            <NavBar />
            <Card title = {dataObtained.pasteTitle} text = {dataObtained.pasteText}/>
            <div className = "text-center">
                <button 
                    className = "btn btn-outline-light rounded-pill mx-1" 
                    style = {{ width: "20%", maxWidth: "20%"}} 
                    type = "button"
                    onClick = {copyURL}
                >
                    Copy Link
                </button>
                <button 
                    className = "btn btn-outline-light rounded-pill mx-1" 
                    style = {{ width: "20%", maxWidth: "20%"}} 
                    type = "button"
                    onClick = {copyText}
                >
                    Copy Text
                </button>
            </div>
            <p className = "fixed-bottom text-center text-white">
                You are currently not logged in, this means you can not edit or delete anything you paste.&nbsp;
                <Link to = "/signUp" className = "text-white">Sign Up</Link> or&nbsp;
                <Link to = "/logIn" className = "text-white">Login.</Link>
            </p>
        </div>
    );
}