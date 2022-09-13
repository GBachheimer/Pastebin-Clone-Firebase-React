
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';

    const firebaseConfig = {
        apiKey: "AIzaSyAoHC1cKcNjOTCzaJSnl6TzrooQNt3QoGA",
        authDomain: "pastebin-clone-firebase-react.firebaseapp.com",
        databaseURL: "https://pastebin-clone-firebase-react-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "pastebin-clone-firebase-react",
        storageBucket: "pastebin-clone-firebase-react.appspot.com",
        messagingSenderId: "762793916217",
        appId: "1:762793916217:web:ac9218a9967838fe871ae8"
    };

    export const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getDatabase(app);
    export const dbRef = ref(getDatabase());

    export default app;