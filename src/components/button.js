import "./pasteButtons.css";
export default function Button(props) {
    return (
        <button 
            className = "btn btn-outline-light rounded-pill mx-1 buttonWidth" 
            type = "button"
            onClick = {props.toDo}
        >
            {props.name}
        </button>
    );
}