import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View , StatusBar} from 'react-native'
// import { auth } from '../../firebase';
// import { StatusBar } from 'expo-status-bar';
// import { getAuth } from "firebase/auth";
// import { database } from 'firebase/database'
// import Header from '../Header';
// import MonthlyBudget from '../Monthly_budget';
// import FooterButtons from '../Footer_buttons';

// import { collection, doc, getDocs, getDoc, setDoc, } from 'firebase/firestore';
// import { db } from '../../src/firebase-config';



const HomeScreen = () => {

//   const auth = getAuth();
//   const user = auth.currentUser;

//   let userEmail = '';

//   if (user !== null) {
//     user.providerData.forEach((profile) => {
//       userEmail = profile.uid
//     });
//   }

//   const navigation = useNavigation()

//   const handleSignOut = () => {
//     auth
//       .signOut()
//       .then(() => {
//         navigation.replace("Login")
//       })
//       .catch(error => alert(error.message))
//   }

//   const GetData = async () => {
//     const userData = collection(db, 'users/dan/');
//     // const userData = collection("users").document("dan").collection("19MAR22")
//     const userSnapshot = await getDocs(userData);
//     const userList = userSnapshot.docs.map(doc => doc.data());

//     console.log("test", userList);
//   }

//   // this is for setting individual user expenses, prob move out of here
//   const SetData = async () => {
//     await setDoc(doc(db, "users", "dan", "19MAR22", "Income"), {
//       value: 10000,
//       description: "sold car",
//       category: "Motor Selling"
//     });
//   }

  // const testFunction = async () => {
  //   database()
  //     .ref('/users/')
  //     .once('value')
  //     .then(snapshot => {
  //       console.log('User data: ', snapshot.val());
  //     });
  // }
  return (
    // <View style={styles.container}>
    //   <Text>Email: {auth.currentUser?.email}</Text>
    //   <TouchableOpacity
    //     onPress={handleSignOut}
    //     style={styles.button}
    //   >
    //     <Text style={styles.buttonText}>Sign out</Text>
    //   </TouchableOpacity>
    // </View>
    <View style={styles.container}>
      {/* <Header onPress={handleSignOut} />
      <MonthlyBudget onPress={SetData} />
      <FooterButtons /> */}
      <Text>hey</Text>
      <StatusBar style="auto" />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})