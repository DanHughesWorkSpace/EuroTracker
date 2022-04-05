import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button, TextInput} from 'react-native';
import { db } from './Core/Config';
import { useState } from 'react';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'

export default function App() {

  const [userDoc, setUserDoc] = useState(null)

  const [text, setText ] = useState("")

  const Create = () => {
    const myDoc = doc(db, "MyCollection", "MyDocument");

    const docData = {
      "name" : "Dan",
      "age": 12
    }

    setDoc(myDoc, docData).then(()=>{
      alert("Dcoument Created")
      })
      .catch((error)=>{
        alert("Error", error.message)
      })
  }

  const Read = () => {
    
    const myDoc = doc(db, "MyCollection", "MyDocument");

    getDoc(myDoc)
      .then((snapshot) => {
        if(snapshot.exists) {
          setUserDoc(snapshot.data())
        }
        else {
          alert("No doc found")
        }
      })
      .catch((error) => {
        alert("Error", error.message)
      })
  }

  const Update = (value,merge) => {
    const myDoc = doc(db, "MyCollection", "MyDocument");

    setDoc(myDoc,value,{merge: merge})
      .then(()=>{
        alert("Update Successful")
        })
        .catch((error)=>{
          alert("Error", error.message)
        })
  }

  const Delete = () => {
    const myDoc = doc(db, "MyCollection", "MyDocument");

    deleteDoc(myDoc)
    .then(()=>{
      alert("Deleted Successful")
      })
      .catch((error)=>{
        alert("Error", error.message)
      })

  }
  return (
    <View style={styles.container}>
      <Button title="Create Doc" onPress={Create}/>
      <Button title="Read Doc" onPress={Read}/>
      {
        userDoc != null &&
        <Text>Age: {userDoc.age}</Text>
      }
      <TextInput style={{
        width: '95%',
        fontSize: 18,
        padding: 12,
        marginVertical: 20
      }} placeholder='Type Here' onChangeText={(text)=>{setText(text)}} value={text}></TextInput>
      <Button title="Update Doc" onPress={()=>{
        Update({
          "age": text
        })
      }} disabled={text == ""}></Button>
      <Button title="Delete Doc" onPress={Delete}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
