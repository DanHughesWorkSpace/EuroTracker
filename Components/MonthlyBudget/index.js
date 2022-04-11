import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Button } from 'react-native';
import SetMonthlyBudgetModal from './SetMonthlyBudgetModal';
import styles from './styles';
import { doc, collection,  getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Core/Config';
import { useState, setState } from 'react';

const MonthlyBudget = (props) => {


  const { onPress, user } = props;

  // const [userDoc, setUserDoc] = useState({
  //   monthlyBudget: ""
  // })

  const [budgetValue, setBudget ] = useState();

  // const state = {
  //   budget: userDoc.monthlyBudget
  // };

  // export function test() {

  // }
  // function getUserMonthlyBudget() {

  //   // const unsub = onSnapshot(doc(db, "users", user), (doc) => {
  //   //   console.log("Current data: ", doc.data());
  //   // });
  //   const myDoc = doc(db, "users", user);

  //   getDoc(myDoc)
  //     .then((snapshot) => {
  //       if (snapshot.exists) {
  //         const ye = setUserDoc(snapshot.data())
  //       }
  //       else {
  //         alert("No doc found")
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error", error.message)
  //     })


  // }
  // // useEffect(() => {
  //   getUserMonthlyBudget();
  //   // console.log('userrr', userDoc.monthlyBudget);
  //   //   console.log("ee", state.budget);
  // }, [])

  // useEffect(() => {
  //   // getUserMonthlyBudget();
  //   console.log('userrr', userDoc.monthlyBudget);
  //   console.log("ee", state.budget);
  // }, [userDoc]
  // )

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
          {/* {(userDoc == null) &&
            <Text> sup </Text>
          } */}
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