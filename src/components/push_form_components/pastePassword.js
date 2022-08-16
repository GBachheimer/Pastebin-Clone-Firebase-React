import {useState} from "react";

export default function PastePassword(props) {
    const [check, setCheck] = useState(false);
    const handleCheckboxEvent = (event) => {
        if(event.target.checked) {
            setCheck(true);
        } else {
            setCheck(false);
        }
    }
    return (
        <div className = "input-group mb-2">
            <div className = "input-group-text">
                <input 
                    className = "form-check-input" 
                    type = "checkbox" 
                    onChange = {handleCheckboxEvent} 
                    id = "passCheckbox" 
                    checked = {check} 
                    name = "passwordCheck"
                />
            </div>
            <div className = "form-floating">
                <input 
                    value = {props.passwordInput} 
                    onChange = {props.toDo} 
                    disabled = {!check} 
                    type = "password" 
                    className = "form-control" 
                    id = "floatingPassword" 
                    placeholder = "Password"
                />
                <label htmlFor  =  "floatingPassword">Password</label>
            </div>
        </div>
    );
}