// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider}from "firebase/auth";
import {getFirestore,
        doc,
        getDoc,
        setDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyADXFBa2moiZfzEcdDDY1hjJIiXOBcCA04",
    authDomain: "crwn-clothing-db-c4c67.firebaseapp.com",
    projectId: "crwn-clothing-db-c4c67",
    storageBucket: "crwn-clothing-db-c4c67.appspot.com",
    messagingSenderId: "5776731583",
    appId: "1:5776731583:web:0c577054345bd4cf03050a"
};


const firebaseApp = initializeApp(firebaseConfig);
const provider=new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});
export const auth=getAuth();
export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);
export const db=getFirestore();
export const createUserDocumentFromAuth=async (userAuth)=>{
    const userDocRef=doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    const userSnapshot=await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    if(!userSnapshot.exists()){
        const {displayName,email}=userAuth;
        const createdAt=new Date();
        try{
            await setDoc(userDocRef,
                {
                    displayName,
                    email,
                    createdAt
                });
        }catch (error){
            console.log('error creating the user',error.message)
        }
    }
    return userDocRef;
}
