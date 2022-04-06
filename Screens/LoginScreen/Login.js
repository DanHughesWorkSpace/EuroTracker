import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
// import styles from './Styles'
import { useNavigation } from '@react-navigation/core'
import { auth } from '../../Core/Config';
import { getAuth, onAuthStateChanged } from "firebase/auth";


import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../Core/Config';

// import { getDatabase, ref, set } from "firebase/database";

const LoginScreen = (props) => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation()

  //   function writeUserData(email) {
  //     const db = getDatabase();
  //     set(ref(db, 'users/' + email), {
  //       email: email,
  //     });
  //   }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home")
      }
    })
    return unsubscribe
  }, [])

  const addToUserList = async (email) => {
    const timeStamp = new Date();
    await setDoc(doc(db, "users", email), {
      monthlyBudget: null
    });
  }

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Account made for", user.email)
        // writeUserData(user.email)
        addToUserList(user.email)
      })
      .catch(error => alert(error.message));
  }

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error => alert(error.message))
  }
  return (
    <KeyboardAvoidingView
      style={styles.container} behaviour="padding"  >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}
      >
        <TouchableOpacity onPress={handleLogin}
          style={styles.button}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}> Register </Text>
        </TouchableOpacity>
      </View>
      {/* <Text> hey </Text> */}
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})