import NavBar from "../components/navbar/navbar";
import "./UserPage.css";
import { useState } from "react";
import UserCards from "../components/infoCards/userCards";
import { child, get } from "firebase/database";
import { useEffect } from "react";
import { auth, dbRef } from "../components/firebase";

export default function UserPage(props) {
    const [userPastes, setUserPastes] = useState([]);

    const getUserPastes = async () => {
        await get(child(dbRef, `usersPastes/${auth.currentUser.uid}`)).then((snapshot) => {
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