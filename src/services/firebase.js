import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { 
    getFirestore,
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA2vOCM_W3UXWl0amX1_vFElyc7iB3GvqI",
    authDomain: "chat-app-7c675.firebaseapp.com",
    databaseURL: "https://chat-app-7c675-default-rtdb.firebaseio.com",
    projectId: "chat-app-7c675",
    storageBucket: "chat-app-7c675.appspot.com",
    messagingSenderId: "155725609642",
    appId: "1:155725609642:web:c3d3686a90bbf7b5ae6ed3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}

function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((x) => ({
                id: x.id,
                ...x.data(),
            }));
            callback(messages);
        }
    );
}

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);

        return { uid: user.uid, displayName: user.displayName };
    } catch (error) { 
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }

        return null;
    }
}



export { loginWithGoogle, sendMessage, getMessages };