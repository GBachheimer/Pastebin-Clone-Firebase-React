export default function PasteExpiration(props) {
    return (
        <div className = "pasteExpiration">
                <label className = "labels text-white" htmlFor="pasteBrowser">Paste Expiration:</label>
                <input 
                    className = "fields form-control" 
                    list="pasteBrowsers" 
                    name="pasteBrowser" 
                    id="pasteBrowser" 
                    onChange = {props.toDo} 
                    value = {props.expirationOption} 
                    placeholder = "15 min"
                />
                <datalist id="pasteBrowsers" placeholder = "Never">
                    <option value="5 min"/>
                    <option value="10 min"/>
                    <option value="15 min"/>
                    <option value="30 min"/>
                    <option value="1 h"/>
                    <option value="3 h"/>
                    <option value="6 h"/>
                    <option value="12 h"/>
                    <option value="24 h"/>
                </datalist>
            <br></br>
        </div>
    );
}