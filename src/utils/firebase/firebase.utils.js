import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_kAeQzEAcrXnGG5Kko2xkeY4PiuM49Eg",
    authDomain: "clothing-shop-8edf9.firebaseapp.com",
    projectId: "clothing-shop-8edf9",
    storageBucket: "clothing-shop-8edf9.appspot.com",
    messagingSenderId: "628828832705",
    appId: "1:628828832705:web:2a2c03949f0af66b2a2540",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
// provider.setCustomParameters({
//     prompt: "select-account",
// });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    
    // if user data not exist
    if(!userSnapshot.exists()){// ko ton tai = true
        const { displayName, email } = userAuth;
        const createAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation
            })
        }catch(error){
            console.log('error creating user', error);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (
    email,
    password
  ) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInUserWithEmailAndPassword = async (
    email,
    password
  ) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = async () => await signOut(auth);
  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

