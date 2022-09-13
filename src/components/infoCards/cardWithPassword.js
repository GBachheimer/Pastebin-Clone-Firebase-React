import { useState } from "react";
import Card from "./card";

export default function CardWithPassword(props) {
    const [pass, setPass] = useState();

    const update = (event) => {
        setPass(event.target.value);
    }

    if (pass !== props.data.pastePassword) {
        return (
            <div className = "text-center">
                <label 
                    className = "input labelStyle" 
                    htmlFor = "pastePassword" 
                    id = "pastePasswordLabel"
                >
                    This paste is password protected.
                </label>
                <input 
                    className = "input my-2" 
                    type = "password" 
                    id = "pastePassword" 
                    name = "pastePassword" 
                    placeholder = "Enter password" 
                    required 
                    autoFocus 
                    value = {pass} 
                    onChange = {update}
                />
            </div>
        );
    } else {
        return (
            <Card data = {props.data}/>
        );
    }
}