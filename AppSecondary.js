// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View , Button, TextInput} from 'react-native';
import { db } from './Core/Config';
// import { useState } from 'react';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import moment from 'moment'
import { useState } from 'react';

// export default function functions() {

// const [userDoc, setUserDoc] = useState(null)

// const [text, setText ] = useState("")

export function Create() {
  const myDoc = doc(db, "MyCollection", "MyDocument");

  const docData = {
    "name": "Dan",
    "age": 12
  }

  setDoc(myDoc, docData).then(() => {
    alert("Dcoument Created")
  })
    .catch((error) => {
      alert("Error", error.message)
    })
}

export function Read() {
  const userEmail = getUser()
  const myDoc = doc(db, "users", userEmail);

  const userData = null;
  getDoc(myDoc)
    .then((snapshot) => {
      if (snapshot.exists) {
        // setUserDoc(snapshot.data())
        console.log("worked");
        userData == snapshot.data()
      }
      else {
        alert("No doc found")
      }
    })
    .catch((error) => {
      console.log("Error", error.message)
    })
  return userData

}

// const Update = (value,merge) => {
export function Update(value, merge) {
  const userEmail = getUser()
  const myDoc = doc(db, "users", userEmail,);
  console.log("Update clicked");
  setDoc(myDoc, value, { merge: merge })
    .then(() => {
      alert("Update Successful")
    })
    .catch((error) => {
      alert("Error", error.message)
    })
}

export function Delete() {
  const myDoc = doc(db, "MyCollection", "MyDocument");

  deleteDoc(myDoc)
    .then(() => {
      alert("Deleted Successful")
    })
    .catch((error) => {
      alert("Error", error.message)
    })
}

export function getUser() {
  const auth = getAuth();
  const uid = auth.currentUser.providerData[0].uid;
  return uid
}