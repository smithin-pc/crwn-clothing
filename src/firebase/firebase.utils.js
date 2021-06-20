import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyDIKS2KUHbU_7kC3BKh-YgyJXSXl5mceY8",
    authDomain: "crwn-db-ae0d6.firebaseapp.com",
    projectId: "crwn-db-ae0d6",
    storageBucket: "crwn-db-ae0d6.appspot.com",
    messagingSenderId: "742205585597",
    appId: "1:742205585597:web:cca786f530e7c4e4215fd4",
    measurementId: "G-EYGC3VMK6D"
  };

  export const createUserProfileDocument = async (userAuth , additionalData) => {
    if (!userAuth) return ;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists)
    {
      const {displayName , email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }
      catch(error)
      {
        console.log('Error creating user',error.message);
      }
    }
    return userRef;
  }
  
  firebase.initializeApp(config);
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;