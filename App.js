import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button, TextInput, Dimensions} from 'react-native';
import { db } from './Core/Config';
import { useState } from 'react';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Screens/LoginScreen/Login';
import HomeScreen from './Screens/HomeScreen/Home';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
      height: Dimensions.get('window').height,
      display: 'flex',
      justifyContent: 'space-between'
    }
});
