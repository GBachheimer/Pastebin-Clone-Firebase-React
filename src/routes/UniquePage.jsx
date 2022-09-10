import NavBar from "../components/navbar/navbar";
import { useParams } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import Card from "../components/card";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../components/firebase";
import CardWithPassword from "../components/cardWithPassword";

export default function UniquePage(props) {
    const [dataObtained, setDataObtained] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const auth = getAuth(app);
    const user = auth.currentUser;
    const dbRef = ref(getDatabase());

    const dataTransfer = async () => {
        const dbRefNonUser = `allPastes/${params.id}`;
            await get(child(dbRef, dbRefNonUser)).then((snapshot) => {
                if (snapshot.exists()) {
                    setDataObtained(snapshot.val());
                    setLoading(false);
                } else {
                    console.log("no data");
                }
            }).catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        dataTransfer();
    }, []);

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
            {(dataObtained.pastePassword && !user) && <CardWithPassword data = {dataObtained}/>}
            {(!dataObtained.pastePassword || user) && <Card data = {dataObtained} />}
        </div>
    );
}