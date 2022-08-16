import { Link } from 'react-router-dom';
        
export default function NavBar() {
    return (        
    <nav className = "navbar navbar-dark bg-dark nav-pills" >
        <h2 className = "navbar-brand" style = {{ margin: "10px" }}>Pastebin Clone</h2>
        <Link to = "/" className = "navbar-brand" style = {{ margin: "10px" }}>+ Paste</Link>
        <div className = "d-inline">
            <Link to = "/signUp" className = "btn btn-outline-light rounded-pill">Sign Up</Link>
            <Link to = "/logIn" className = "btn btn-outline-light rounded-pill mx-3">Login</Link>
        </div>
    </nav>
    );
}