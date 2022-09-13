import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../userContext";
import "./userCards.css";

export default function UserCards(props) {
    const colors = ["primary","secondary", "success", "danger", "warning", "info", "light", "dark"];
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const mapData = 
        Object.entries(props.userPastes).map((paste) => {
            const randomColor = Math.floor(Math.random() * 8);
            const id = paste[0];
            const handleCardClick = () => {
                navigate(`/paste/${id}`);
            }
                return (           
                    <div className = "col-sm-6 animate" key = {paste[0]} onClick = {handleCardClick}>
                        <div className = {`card text-bg-${colors[randomColor]} my-2`}>
                            <div className = "card-header" style = {{fontSize: "1rem"}}>
                                {paste[1].pasteTitle}
                            </div>
                            {
                            (!paste[1].pastePassword || (user && paste[1].pasteUser === user.uid)) && 
                            <div className = "card-body" style = {{maxHeight: "15vw", overflow: "scroll"}}>
                                <p className = "card-text preserveNewline" id = "cardText" style = {{fontSize: "0.5rem", textAlign: "left"}}>{paste[1].pasteText}</p>
                            </div>
                            }
                        </div>
                    </div>
                );
        });

    return (
        <div className = "row" style = {{width: "100%"}}>
            {mapData}
        </div>
    );
}