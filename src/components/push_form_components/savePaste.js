export default function SavePaste(props) {
    return (
        <div className = "d-grid gap-2 col-6 mx-auto">
            <button className = "btn btn-outline-light rounded-pill my-4" type = "button" onClick = {props.toDo} >Save</button>
        </div>
    );
}