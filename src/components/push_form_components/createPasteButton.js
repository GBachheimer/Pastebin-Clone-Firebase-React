export default function CreatePaste(props) {
    return (
        <div className = "d-grid gap-2 col-6 mx-auto">
            <button className = "btn btn-outline-light rounded-pill my-4" type = "button" onClick = {props.toDo} >Create New Paste</button>
        </div>
    );
}