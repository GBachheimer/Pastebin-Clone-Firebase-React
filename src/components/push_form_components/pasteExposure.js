export default function PasteExposure(props) {
    return (
        <div className  =  "pasteExposure">
                <label className = "labels text-white" htmlFor = "exposureBrowser">Paste Exposure:</label>
                <input 
                    className = "fields form-control" 
                    list = "exposureBrowsers" 
                    name = "exposureBrowser" 
                    id = "exposureBrowser" 
                    onChange = {props.toDo}
                    value = {props.exposureOption}
                />
                <datalist id = "exposureBrowsers">
                    <option value = "Unlisted"/>
                    <option value = "Public"/>
                </datalist>
            <br></br>
        </div>
    );
}