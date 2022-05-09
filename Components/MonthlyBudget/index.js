import React, { useEffect } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Button } from 'react-native';
import SetMonthlyBudgetModal from './SetMonthlyBudgetModal';
import styles from './styles';
import { doc, collection, getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Core/Config';
import { useState } from 'react';

import moment from 'moment'
import { getUser } from '../../AppSecondary';

import { PieChart } from 'react-native-svg-charts'

const MonthlyBudget = (props) => {

  const { onPress, user } = props;

  const [budgetValue, setBudget] = useState();

  const [userMonthlyIncome, setUserMonthlyIncome] = useState(0);

  const [userMonthlyExpense, setUserMonthlyExpense] = useState(0);

  const [progressPercent, setProgressPercent] = useState();

  const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState();

  const [pieChartKeysArray, setPieChartKeysArray] = useState([]);

  const [pieChartValueArray, setPieChartValueArray] = useState();

  const [data, setData] = useState();

  const [testData, setTestData] = useState([
    {
      key: 0,
      value: 0,
      svg: { fill: '' },
    }
  ]);

  const colors = [
    '#13a9cc',
    '#198cee',
    '#bc70cf',
    '#ad6236',
    '#c840c2',
  ]

  const userEmail = getUser();
  const date = moment().format("DDMMMYYYY");
  const month = moment().format("MMM");
  const day = moment().format("DD");
  const year = moment().format("YYYY");

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };

  useEffect(() => {
    const userMonthlyBudget = collection(db, "users")
    const userTotalMonthlyIncome = collection(db, "users", userEmail, month,);

    const testt = getPieChartData(pieChartValueArray)
    setTestData(testt)
    console.log("yes", testData);

    getPreviousDaysInCurrentMonth(day, month, year);
    // getUserMonthlyExpenseValue();
    onSnapshot(userMonthlyBudget, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setBudget(doc.data().monthlyBudget)
      })
    })
    onSnapshot(userTotalMonthlyIncome, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        // console.log(doc.data().totalExpenses);
        setTotalMonthlyExpenses(doc.data().totalExpenses)
      })
    })

    const progress = (totalMonthlyExpenses / budgetValue * 100).toFixed(2) + "%"
    setProgressPercent(progress)

  }, [totalMonthlyExpenses])

  function getPieChartData(data) {
    return data.map((item, index) => {
      return {
        key: index,
        value: item,
        svg: { fill: colors[index] },
      }
    })
  }

  function getPreviousDaysInCurrentMonth(dayIndex, month, year) {
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

  function getCurrentMonthExpensesData(datesArray, currentMonth) {
    let expenseArray = [];
    for (var i = 0; i < datesArray.length; i++) {
      const currentMonthCollectionRef = collection(db, "users", user, currentMonth, datesArray[i], "EXPENSE");
      onSnapshot(currentMonthCollectionRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          expenseArray.push(doc.data())
        })
        getCategoryItemsForPieChart(expenseArray)

      })
      expenseArray = [];
    }
    // let incomeArray = [];
    // for (var i = 0; i < datesArray.length; i++) {
    //   const currentMonthCollectionRef = collection(db, "users", user, currentMonth, datesArray[i], "INCOME");
    //   onSnapshot(currentMonthCollectionRef, (snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       incomeArray.push(Number(doc.data().value))
    //     })
    //      calcIncome(incomeArray);
    //      incomeArray = [];
    //   })
    // }
    // calcProgressBar(userMonthlyExpense, budgetValue)
  }

  function getCategoryItemsForPieChart(array) {
    // console.log("array", array);
    const categoryList = {}
    const categoryValues = []
    for (var i = 0; i < array.length; i++) {
      if (!categoryList[array[i].category]) {
        categoryList[array[i].category] = 0
      }
    }
    setPieChartValues(array, categoryList)
  }

  function setPieChartValues(mainArray, categoryList) {
    for (var i = 0; i < mainArray.length; i++) {
      const category = mainArray[i].category
      const valueToAdd = mainArray[i].value

      categoryList[category] = Number(categoryList[mainArray[i].category]) + Number(mainArray[i].value)
    }

    const keysArray = []
    const valuesArray = []
    for (const item in categoryList) {
      keysArray.push(item)
      valuesArray.push(categoryList[item])
    }

    setPieChartKeysArray(keysArray);
    setPieChartValueArray(valuesArray)
    // test(keysArray,valuesArray)  
  }

  function test(keysDataArray, valuesDataArray) {
    const data1 = []

    for (var i = 0; i < keysDataArray.length; i++) {
      const obj = {
        key: null,
        value: null,
        svg: null,
        // arc: { ou  terRadius: '100%', cornerRadius: 5, }
      };
      obj.key = keysDataArray[i]
      obj.value = valuesDataArray[i]
      obj.svg = { fill: colors[i] }
      obj.onPress = () => { console.log("done") }
      data1.push(obj)
      setData(data1)

    }
    console.log("check data1", data);
  }
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.image} /> */}

      {/* <View>
        <TouchableOpacity onPress={onPress}>
          <Text> Click </Text>
        </TouchableOpacity>
      </View> */}
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
          <View style={styles.progressPecentText}>
            <Text>
              You have spent {progressPercent} of your budget.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.expensesDistributionGraph}>
        <View style={styles.pieChartHeader}>
          <Text>Expenses Distribution Graph</Text>
        </View>
        <View style={styles.pieChartContainer}>
          <PieChart
            style={{ width: 200, height: 200 }}
            data={testData}
            chartConfig={chartConfig} />
          <View style={styles.pieChartLegend}>
            {
              colors.map(function (item, i) {
                return <View style={styles.legendContainer}>
                  <View style={[styles.square, { backgroundColor: item }]}></View>
                  <Text style={{ color: item }}>
                    {pieChartKeysArray[i]}</Text>
                    <Text style={{ color: item }}>
                    £{pieChartValueArray[i]}</Text>
                </View>
                  ;
              })
            }
          </View>
        </View>
      </View>
    </View>
  )
}

export default MonthlyBudget;