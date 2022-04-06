import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Button } from 'react-native';
import SetMonthlyBudgetModal from './SetMonthlyBudgetModal';
import styles from './styles';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../Core/Config';
import { useState } from 'react';

const MonthlyBudget = (props) => {


  const { onPress, user } = props;

  const [userDoc, setUserDoc] = useState(null)

  function getUserMonthlyBudget() {
    const myDoc = doc(db, "users", user);

    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserDoc(snapshot.data())
        }
        else {
          alert("No doc found")
        }
      })
      .catch((error) => {
        console.log("Error", error.message)
      })

  }

  useEffect(() => {
    getUserMonthlyBudget();
    console.log('userrr', userDoc.monthlyBudget);
  },[userDoc.monthlyBudget]
  )

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
          {/* {(userDoc == null) &&
            <Text> sup </Text>
          } */}
          <Text style={styles.monthlyText}> MARCH BUDGET {userDoc.monthlyBudget} </Text>

          <SetMonthlyBudgetModal style={styles.budgetIcon} user={user} />
        </View>
        <View style={styles.progressBar}>

        </View>
      </View>

    </View>
  )
}

export default MonthlyBudget;