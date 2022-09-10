
import { initializeApp } from 'firebase/app';

    const firebaseConfig = {
        apiKey: "AIzaSyAoHC1cKcNjOTCzaJSnl6TzrooQNt3QoGA",
        authDomain: "pastebin-clone-firebase-react.firebaseapp.com",
        databaseURL: "https://pastebin-clone-firebase-react-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "pastebin-clone-firebase-react",
        storageBucket: "pastebin-clone-firebase-react.appspot.com",
        messagingSenderId: "762793916217",
        appId: "1:762793916217:web:ac9218a9967838fe871ae8"
    };

    const app = initializeApp(firebaseConfig);

    export default app;