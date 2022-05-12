import { createContext, useContext, useEffect, useState } from "react";

import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase_config"

import { currentDateAndTime } from "../common"

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});
  
    function logIn(email, password) {
      return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const userDetail = userCredential.user;
        console.log(userDetail);
        // ...
      })
      .catch((error) => {
        console.log(error);
      });;
    }
    async function signUp(email, password, firstName, lastName) {
        try {
            const { user = {} } = await createUserWithEmailAndPassword(auth, email, password);
            const docRef = collection(db, 'users')
            if(user.uid) {
                await setDoc(doc(docRef, user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    todos: [{
                        userId: user.uid,
                        todo: 'First Todo Item',
                        progress: false,
                        createdDate: currentDateAndTime(),
                    }]
                })
            }
        } catch (error) {
            console.log(error);
        }

    //   return createUserWithEmailAndPassword(auth, email, password);
    }
    function logOut() {
      return signOut(auth);
    }
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
        });
        return () => unsubscribe();
    }, []);
    
    return (
      <userAuthContext.Provider
        value={{ user, logIn, signUp, logOut, resetPassword }}
      >
        {children}
      </userAuthContext.Provider>
    );
}

export function useUserAuth () {
    return useContext(userAuthContext)
}