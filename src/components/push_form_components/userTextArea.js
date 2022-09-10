import "./userTextArea.css";

export default function MainTextArea(props) {

    return (
        <div className = "form-floating" >
            <textarea
                className = "form-control"
                type = "text" 
                id = "floatingTextarea2"                    
                name = "floatingTextarea2" 
                size = {Infinity}
                onFocus = {props.onFocus}
                onBlur = {props.onBlur}
                value = {props.userText}
                onChange = {props.onChange}
                style = {{ height: "40vh"}}
            />
            <label id = "textFieldLabel" htmlFor = "floatingTextarea2">Insert your text here ...</label>
        </div>
    );
}