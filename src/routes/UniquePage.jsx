import NavBar from "../components/navbar/navbar";
import { useParams } from "react-router-dom";
import { child, get } from "firebase/database";
import Card from "../components/infoCards/card.js";
import { useEffect, useState, useContext} from "react";
import CardWithPassword from "../components/infoCards/cardWithPassword";
import { AuthContext } from "../components/userContext";
import { dbRef } from "../components/firebase";

export default function UniquePage(props) {
    const [dataObtained, setDataObtained] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const dbRefNonUser = `allPastes/${params.id}`;
        get(child(dbRef, dbRefNonUser)).then((snapshot) => {
            if (snapshot.exists()) {
                setDataObtained(snapshot.val());
                setLoading(false);
            } else {
                console.log("no data");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [params.id]);

    const showLoadingScreen = () => {
        return (
            <div>
                <NavBar />
            </div>
        );
    }

    return (
        loading ? showLoadingScreen() : 
        <div >
            <NavBar />
            {
            ((dataObtained.pastePassword && !user) || 
            (dataObtained.pastePassword && user && dataObtained.pasteUser !== user.uid)) && 
            <CardWithPassword data = {dataObtained}/>
            }
            {
            (!dataObtained.pastePassword || 
            (user && (dataObtained.pasteUser === user.uid))) && 
            <Card data = {dataObtained} />
            }
        </div>
    );
}