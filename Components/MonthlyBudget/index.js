import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Button } from 'react-native';
import SetMonthlyBudgetModal from './SetMonthlyBudgetModal';
import styles from './styles';
import { doc, collection, getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Core/Config';
import { useState } from 'react';

import moment from 'moment'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


const MonthlyBudget = (props) => {

  const { onPress, user } = props;

  const [budgetValue, setBudget] = useState();

  const [userMonthlyIncome, setUserMonthlyIncome] = useState(0);

  const [userMonthlyExpense, setUserMonthlyExpense] = useState(0);

  const [progressPercent, setProgressPercent] = useState();

  useEffect(() => {

    const userMonthlyBudget = collection(db, "users")

    const date = moment().format("DDMMMYYYY");
    const totalMonthlyIncome = collection(db, "users", user, date)

    getTodaysInputs(totalMonthlyIncome, userMonthlyExpense)
    //real time update
    onSnapshot(userMonthlyBudget, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setBudget(doc.data().monthlyBudget)
      })
    })


  })

  function getTodaysInputs(totalMonthlyIncome, totalMonthlyExpense) {
    const incomeValues = [];
    const expenseValues = [];
    onSnapshot(totalMonthlyIncome, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().type == "INCOME") {
          const itemValue = Number(doc.data().value)
          incomeValues.push(itemValue)
        } else {
          const itemValue = Number(doc.data().value)
          expenseValues.push(itemValue)
        }
      })
      calcIncome(incomeValues)
      calcExpense(expenseValues)
      calcProgressBar(userMonthlyExpense, budgetValue)
    })

    function calcIncome(incomeArray) {
      const initialValue = 0;
      const sumWithInitial = incomeArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
      );
      setUserMonthlyIncome(sumWithInitial)
    }

    function calcExpense(expenseArray) {
      const initialValue = 0;
      const sumWithInitial = expenseArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
      );
      setUserMonthlyExpense(sumWithInitial)
    }

    function calcProgressBar(expenses, budget) {
      const percentage = (expenses / budget * 100) + "%";
      setProgressPercent(percentage)
    }
  }
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
          <Text style={styles.monthlyText}> MARCH BUDGET {budgetValue}</Text>

          <SetMonthlyBudgetModal style={styles.budgetIcon} user={user} />
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progressBarBorder}>
            <View style={{ backgroundColor: 'yellow', width: progressPercent,}}>
              <Text>
                £{userMonthlyExpense}/£{budgetValue}
              </Text>
            </View>
          </View>
          <Text>
            You have spent {progressPercent} of your budget.
          </Text>
        </View>
      </View>

    </View>
  )
}

export default MonthlyBudget;