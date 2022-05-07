import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Button } from 'react-native';
import SetMonthlyBudgetModal from './SetMonthlyBudgetModal';
import styles from './styles';
import { doc, collection, getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Core/Config';
import { useState } from 'react';

import moment from 'moment'
import { getUser } from '../../AppSecondary';

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

  const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState();

  const userEmail = getUser();
  const date = moment().format("DDMMMYYYY");
  const month = moment().format("MMM");
  const day = moment().format("DD");
  const year = moment().format("YYYY");

  useEffect(() => {

    const userMonthlyBudget = collection(db, "users")
    const userTotalMonthlyIncome = collection(db, "users", userEmail, month, );
  

    getPreviousDaysInCurrentMonth(day, month, year);
    // getUserMonthlyExpenseValue();
    onSnapshot(userMonthlyBudget, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setBudget(doc.data().monthlyBudget)
      })
    })
    onSnapshot(userTotalMonthlyIncome, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data().totalExpenses);
        setTotalMonthlyExpenses(doc.data().totalExpenses)
      })
    })

    const progress = (totalMonthlyExpenses/budgetValue * 100 ).toFixed(2) + "%"
    setProgressPercent(progress)

    console.log("test total", totalMonthlyExpenses);
  }, [totalMonthlyExpenses])

  // function getUserMonthlyExpenseValue() {
  //   const myDoc = doc(db, "users", userEmail, month, "totalMonthlyExpenses");
  //   getDoc(myDoc)
  //     .then((snapshot) => {
  //       if (snapshot.exists) {
  //         setTotalMonthlyExpenses(Number(snapshot.data().totalExpenses))
  //       }
  //       else {
  //         alert("No doc found")
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error", error.message)
  //     })
  //     console.log("total", totalMonthlyExpenses);
  // }

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
    //getCurrentMonthExpensesData(dates, month) //this function may remain just to be able to filter throught different categories and so on
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
                £{totalMonthlyExpenses}/£{budgetValue}
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