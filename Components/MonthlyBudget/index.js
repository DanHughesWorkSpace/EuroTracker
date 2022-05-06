import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Button } from 'react-native';
import SetMonthlyBudgetModal from './SetMonthlyBudgetModal';
import styles from './styles';
import { doc, collection, getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Core/Config';
import { useState } from 'react';

import moment from 'moment'

// progress bar not updating automatically, needs a CTRL S
// total monthly EXPs seem to be updating accordingly

// pull new totalExpenses figure and display accordingly
// ensure page updates when a value has changed
  //  get budget, total Expenses and percentage complete figure to update automatically

const MonthlyBudget = (props) => {

  const { onPress, user } = props;

  const [budgetValue, setBudget] = useState();

  const [userMonthlyIncome, setUserMonthlyIncome] = useState(0);

  const [userMonthlyExpense, setUserMonthlyExpense] = useState(0);

  const [progressPercent, setProgressPercent] = useState();

  useEffect(() => {

    const userMonthlyBudget = collection(db, "users")

    const date = moment().format("DDMMMYYYY");
    const month = moment().format("MMM");
    const day = moment().format("DD");
    const year = moment().format("YYYY");

    getPreviousDaysInCurrentMonth(day, month, year);

    onSnapshot(userMonthlyBudget, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setBudget(doc.data().monthlyBudget)
      })
    })
  },[])

  function getPreviousDaysInCurrentMonth(dayIndex, month, year) {
    console.log("day index", dayIndex)
    const dates = []
    for (var i = 1; i <= dayIndex; i++) {
      const singleDigitConvert = ""
      if (i < 10) {
        singleDigitConvert = "0" + i
        dates.push(singleDigitConvert + month + year)
      } else {
        dates.push(i + month + year)
      }
    }
    getCurrentMonthExpensesData(dates, month) //this function may remain just to be able to filter throught different categories and so on
  }

  // function getCurrentMonthExpensesData(datesArray, currentMonth) {
  //   let expenseArray = [];
  //   for (var i = 0; i < datesArray.length; i++) {
  //     const currentMonthCollectionRef = collection(db, "users", user, currentMonth, datesArray[i], "EXPENSE");
  //     onSnapshot(currentMonthCollectionRef, (snapshot) => {
  //       snapshot.docs.forEach((doc) => {
  //         expenseArray.push(doc.data())
  //       })
  //       // console.log("EXP22", expenseArray);
  //       calcExpense(expenseArray);
  //     })
  //     expenseArray = [];
  //   }

  //   let incomeArray = [];
  //   for (var i = 0; i < datesArray.length; i++) {
  //     const currentMonthCollectionRef = collection(db, "users", user, currentMonth, datesArray[i], "INCOME");
  //     onSnapshot(currentMonthCollectionRef, (snapshot) => {
  //       snapshot.docs.forEach((doc) => {
  //         incomeArray.push(Number(doc.data().value))
  //       })
  //        calcIncome(incomeArray);
  //        incomeArray = [];
  //     })
  //   }
  //   calcProgressBar(userMonthlyExpense, budgetValue)
  // }

  // function calcIncome(incomeArray) {
  //   let sum = 0;
  //   for(var i=0;i<incomeArray.length;i++){
  //     sum += Number(incomeArray[i].value)
  //     console.log("sum", sum);
  //   }
  //   // setUserMonthlyIncome(sum)
  // }

  // function calcExpense(expenseArray) {
  //   // console.log("exp array", expenseArray);
  //   let sum = 0;
  //   for(var i=0;i<expenseArray.length;i++){
  //     // console.log("number", expenseArray[i].value);
  //     sum += Number(expenseArray[i].value)
  //     // console.log("sum", sum);
  //   }
  //   setUserMonthlyExpense(sum)
  //   // console.log("user monthly expense1", userMonthlyExpense);
  // }

  function calcProgressBar(expenses, budget) {
    const percentage = (expenses / budget * 100) + "%";
    setProgressPercent(percentage)
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
            <View style={{ backgroundColor: 'yellow', width: progressPercent, }}>
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