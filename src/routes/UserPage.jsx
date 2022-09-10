import NavBar from "../components/navbar/navbar";
import "./UserPage.css";
import { useState } from "react";
import UserCards from "../components/userCards";
import app from "../components/firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { useEffect } from "react";

export default function UserPage(props) {
    const [userPastes, setUserPastes] = useState([]);

    const dbRef = ref(getDatabase());
    const auth = getAuth(app);
    const user = auth.currentUser;
    const uid = user.uid;

    const getUserPastes = async () => {
        await get(child(dbRef, `usersPastes/${uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUserPastes(snapshot.val());
                document.getElementById("userMessage").innerHTML = "↓ All my pastes ↓";
            } else {
                document.getElementById("userMessage").innerHTML = "No pastes available yet.";
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getUserPastes();
    }, []);

    return (
        <div>
            <NavBar />
            <div className = "title">
                <p id = "userMessage"></p>
                <UserCards userPastes = {userPastes}/>
            </div>
        </div>
    );
}