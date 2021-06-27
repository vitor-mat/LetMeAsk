import firebase from 'firebase';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../services/firebase';

type UserType = {
    id: string;
    name: string;
    avatar: string
  }
  
  type AuthContextType = {
    user: UserType | undefined;
    signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
    children: ReactNode;
}

export const authContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){

    const [user, setUser] = useState<UserType>();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
  
          const  { displayName, photoURL, uid } = user;
  
          if(!displayName || !photoURL){
            throw new Error("Missing information from Google Account.");
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
  
        }
  
      })
  
      return () => {
        unsubscribe();
      }
  
    }, [])
  
    async function signInWithGoogle(){
      let provider = new firebase.auth.GoogleAuthProvider();
  
      const result = await auth.signInWithPopup(provider);
  
        if(result.user){
          const  { displayName, photoURL, uid } = result.user;
          if(!displayName || !photoURL){
            throw new Error("Missing information from Google Account.");
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
    }

    return(
        <authContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </authContext.Provider>
    )
}