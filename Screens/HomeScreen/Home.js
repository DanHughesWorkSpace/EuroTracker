import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View , StatusBar} from 'react-native'
import { auth } from '../../Core/Config';
// import { StatusBar } from 'expo-status-bar';
// import { database } from 'firebase/database'

import Header from '../../Components/Header';
import MonthlyBudget from '../../Components/MonthlyBudget';
import Footer from '../../Components/Footer'

import { getUser } from '../../AppSecondary';

const HomeScreen = () => {

  const testusername = getUser();
  console.log(testusername);
  // let userEmail = '';

  // if (user !== null) {
  //   user.providerData.forEach((profile) => {
  //     userEmail = profile.uid
  //   });
  // }

  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      {/* <Header onPress={handleSignOut} />
      <MonthlyBudget onPress={SetData} />
      <FooterButtons /> */}
      {/* <Text>hey</Text> */}
      {/* <Header/> */}
      <Header onPress={handleSignOut} />
      <MonthlyBudget user={testusername}/>
      <Footer />
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