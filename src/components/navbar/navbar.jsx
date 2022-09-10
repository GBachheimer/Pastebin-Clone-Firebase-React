import { Link } from 'react-router-dom';
import "./navbarStyle.css";
import app from '../firebase';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
        
export default function NavBar(props) {
    const auth = getAuth(app);
    const user = auth.currentUser;

    const navigate = useNavigate();
    
    const signout = async () => {
        await auth.signOut().then(handleSignOutState);
    }

    const handleSignOutState = () => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/");
            }
        });
    }

        return (        
            <nav className = "navbar navbar-dark bg-dark">
                {(!user || !user.emailVerified) && <p style = {{ margin: "10px", color: "white", fontSize: "1rem", display: "inline"}}>Pastebin Clone</p>}
                {user && user.emailVerified && <Link to = "/user" className = "btn btn-outline-light rounded-pill m-1">All my pastes</Link>}
                <div>
                    <Link to = "/public" className = "btn btn-outline-light rounded-pill m-1" >Public pastes</Link>
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