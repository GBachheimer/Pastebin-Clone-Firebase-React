export default function SyntaxHighlight(props) {
    return (
        <div className = "syntaxDropdown">
           <div>
                <label className = "labels text-white" htmlFor = "syntaxBrowser">Syntax Highlighting:</label>
                <input 
                    className = "fields form-control" 
                    list = "syntaxBrowsers" 
                    name = "syntaxBrowser" 
                    id = "syntaxBrowser" 
                    onChange = {props.toDo} 
                    value = {props.sytaxValue} 
                    placeholder = "None"
                />
                <datalist id = "syntaxBrowsers">
                    <option value = "None"/>
                    <option value = "Javascript"/>
                    <option value = "Java"/>
                    <option value = "C++"/>
                    <option value = "PHP"/>
                    <option value = "Phytop"/>
                    <option value = "Perl"/>
                    <option value = "Ruby"/>
                    <option value = "Swift"/>
                    <option value = "Bash"/>
                    <option value = "CSS"/>
                    <option value = "HTML"/>
                    <option value = "React"/>
                    <option value = "JSON"/>
                    <option value = "C#"/>
                </datalist>
            </div>
            <br></br>
        </div>
    );
}