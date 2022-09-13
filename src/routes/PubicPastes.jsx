import NavBar from "../components/navbar/navbar";
import "./UserPage.css";
import { useState, useEffect } from "react";
import UserCards from "../components/infoCards/userCards";
import { child, get } from "firebase/database";
import { dbRef } from "../components/firebase";

export default function PublicPastes(props) {
    const [userPastes, setUserPastes] = useState([]);

    const getUserPastes = async () => {
        await get(child(dbRef, `publicPastes`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUserPastes(snapshot.val());
            } else {
                document.getElementById("announcement").innerHTML = "No pastes available yet.";
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
                <p id = "announcement"></p>
                <UserCards userPastes = {userPastes} />
            </div>
        </div>
    );
}