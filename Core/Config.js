import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import * as firebase from 'firebase'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoxzz661CdK6QC8yz8dRnnBM2BZ6Zmm8I",
    authDomain: "euro-tracker-2d1a1.firebaseapp.com",
    projectId: "euro-tracker-2d1a1",
    storageBucket: "euro-tracker-2d1a1.appspot.com",
    messagingSenderId: "159440878789",
    appId: "1:159440878789:web:29c48e283fe5e597d5c4ac"
  };

  let app;
if (firebase.apps.length === 0){
app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };

// export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);