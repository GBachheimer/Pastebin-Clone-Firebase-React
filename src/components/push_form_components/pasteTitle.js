export default function PasteTitle(props) {
    return (
        <div className = "pasteTitle">
           <div>
                <label className = "labels text-white" htmlFor = "Title">Title:</label>
                <input 
                    className = "fields form-control" 
                    type = "Title" 
                    id = "pass" 
                    name = "Title" 
                    onChange = {props.toDo} 
                    value = {props.title} 
                    placeholder = "My Title"
                />
            </div>
            <br></br>
        </div>
    );
}