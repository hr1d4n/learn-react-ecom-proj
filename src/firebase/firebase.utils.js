//  import firebase from 'firebase/compat/app';
//  import 'firebase/compat/firestore';
//  import 'firebase/compat/auth';

// const config = {
//   apiKey: "AIzaSyBpyOnq6CL450bXmPh6Oj-Rpw1GcnI-Ur8",
//   authDomain: "crwn-db-ff0aa.firebaseapp.com",
//   projectId: "crwn-db-ff0aa",
//   storageBucket: "crwn-db-ff0aa.appspot.com",
//   messagingSenderId: "497897869996",
//   appId: "1:497897869996:web:c6e6f165a4a31223d30509"
//   };

//   firebase.initializeApp(config);

//   export const auth = firebase.auth();
//   export const firestore = firebase.firestore();

//   const provider = new firebase.auth.GoogleAuthProvider();
//   provider.setCustomParameters({prompt: 'select_account'});
//   export const signInWithGoogle = () => auth.signInWithPopup(provider);

//   export default firebase;

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBpyOnq6CL450bXmPh6Oj-Rpw1GcnI-Ur8",
  authDomain: "crwn-db-ff0aa.firebaseapp.com",
  projectId: "crwn-db-ff0aa",
  storageBucket: "crwn-db-ff0aa.appspot.com",
  messagingSenderId: "497897869996",
  appId: "1:497897869996:web:c6e6f165a4a31223d30509"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  //console.log("snapshot:", snapShot);
  //console.log("snapshot exists:", snapShot.exists());

  //if(!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      }, {merge: true});
    } catch(error) {
      console.log('error creating user', error.message);
    }
  //}
  return userRef;
}

initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
//export const test = createUserWithEmailAndPassword();

const provider = new GoogleAuthProvider();

/*varianta curs udemy*/
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider)
  .then((result) => {

  }).catch((error) => {
    console.log(error);
  });

/*varianta noua din documentatia firebase*/
/*export const signInWithGoogle = () => signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });*/