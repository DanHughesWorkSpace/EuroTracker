import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Button } from 'react-native';
import SetMonthlyBudgetModal from './SetMonthlyBudgetModal';
import styles from './styles';
import { doc, collection,  getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Core/Config';
import { useState } from 'react';

const MonthlyBudget = (props) => {

  const { onPress, user } = props;

  const [budgetValue, setBudget ] = useState();

  useEffect(() => {

    const colRef = collection(db, "users")
    //real time update
    onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {          
            setBudget(doc.data().monthlyBudget)
        })
    })
})
  return (
    <View style={styles.container}>

      <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.image} />

      <View>
        <TouchableOpacity onPress={onPress}>
          <Text> Click </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.monthlyBudgetContainer}>
        <View style={styles.monthlyHeader}>
          <Text style={styles.monthlyText}> MARCH BUDGET {budgetValue} </Text>

          <SetMonthlyBudgetModal style={styles.budgetIcon} user={user} />
        </View>
        <View style={styles.progressBar}>

        </View>
      </View>

    </View>
  )
}

export default MonthlyBudget;