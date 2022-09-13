import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../userContext';
import { auth } from '../firebase';
        
export default function NavBar(props) {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const signout = async () => {
        await auth.signOut().then(navigate("/"));
    }

    return (        
        <nav className = "navbar navbar-dark bg-dark">
            {(!user || !user.emailVerified) && <p style = {{ margin: "10px", color: "white", fontSize: "1rem", display: "inline"}}>Pastebin Clone</p>}
            {user && user.emailVerified && <Link to = "/paste/user" className = "btn btn-outline-light rounded-pill m-1">All my pastes</Link>}
            <div>
                <Link to = "/paste/public" className = "btn btn-outline-light rounded-pill m-1" >Public pastes</Link>
                <Link to = "/" className = "btn btn-outline-light rounded-pill" >+ Paste</Link>
            </div>
            <div>
                {(!user || !user.emailVerified) && <Link to = "/signUp" className = "btn btn-outline-light rounded-pill">Sign up</Link>}
                {(!user || !user.emailVerified) && <Link to = "/logIn" className = "btn btn-outline-light rounded-pill m-1">Log in</Link>}
                {user && user.emailVerified && <button className = "btn btn-outline-light rounded-pill m-1" onClick = {signout}>Sign out</button>}
            </div>
        </nav>
    );
}