import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Button } from 'react-native';
import SetMonthlyBudgetModal from './SetMonthlyBudgetModal';
import styles from './styles';
import { doc, collection, getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Core/Config';
import { useState } from 'react';

import moment from 'moment'
import { getUser } from '../../AppSecondary';

import PieChartWithDifferentArcs from '../PieChart/index';

import { PieChart } from 'react-native-svg-charts'

// import { PieChart } from 'react-native-chart-kit';

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

  const [pieChartKeysArray, setPieChartKeysArray] = useState([]);

  const [pieChartValueArray, setPieChartValueArray] = useState();

  const [data, setData] = useState();

  const colors = ['#600080', '#9900cc', '#ecb3ff', '#c61aff', '#d966ff']

  const userEmail = getUser();
  const date = moment().format("DDMMMYYYY");
  const month = moment().format("MMM");
  const day = moment().format("DD");
  const year = moment().format("YYYY");

  useEffect(() => {

    const userMonthlyBudget = collection(db, "users")
    const userTotalMonthlyIncome = collection(db, "users", userEmail, month,);


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

    const progress = (totalMonthlyExpenses / budgetValue * 100).toFixed(2) + "%"
    setProgressPercent(progress)

  }, [totalMonthlyExpenses])

  function getPreviousDaysInCurrentMonth(dayIndex, month, year) {
    // console.log("day index", dayIndex)
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
        // console.log("EXP22", expenseArray);
        // calcExpense(expenseArray);
        getCategoryItemsForPieChart(expenseArray)
        // console.log("expensesarray", expenseArray);

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
    const categoryList = {}
    const categoryValues = []
    for (var i = 0; i < array.length; i++) {
      if (!categoryList[array[i].category]) {
        categoryList[array[i].category] = 0
      }
    }
    // calculateCategoriesForPieChart(array, categoryList)
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
    // setPieChartKeysArray(keysArray);
    // setPieChartValueArray(valuesArray)
    test(keysArray,valuesArray)  
    // console.log("final", keysArray,valuesArray  );
  }

  function test(keysDataArray, valuesDataArray) {
    // console.log("test", keysDataArray,valuesDataArray);

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
      data1.push(obj)
      // console.log("loop", data1);
      setData(data1)

    }
    console.log("check data1", data);
  }

  const data11 = [
    {
        key: "Food",
        value: 90,
        svg: { fill: '#600080' },
        // arc: { outerRadius: '130%', cornerRadius: 10, }
        
    },
    {
        key: "B",
        value: 50,
        svg: { fill: '#9900cc' }
    },
    {
        key: "C",
        value: 40,
        svg: { fill: '#c61aff' }
    },
    {
        key: "D",
        value: 95,
        svg: { fill: '#d966ff' }
    },
    {
        key: "E",
        value: 35,
        svg: { fill: '#ecb3ff' }
    }
]
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.image} /> */}

      {/* <View>
        <TouchableOpacity onPress={onPress}>
          <Text> Click </Text>
        </TouchableOpacity>
      </View> */}

      {/* <PieChart
        data={data}
        // width={screenWidth}
        height='100%'
        chartConfig={chartConfig}
        accessor="population"
        // backgroundColor="transparent"
        paddingLeft="15"
      /> */}
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
        {/* <PieChartWithDynamicSlices keysDataArray={pieChartKeysArray} valuesDataArray={pieChartValueArray}/> */}

        {/* <PieChartWithDifferentArcs array1={data} /> */}
        <PieChart
            style={{ height: 200 }}
            outerRadius={'70%'}
            innerRadius={10}
            data={data}
        />
      </View>
    </View>
  )
}

export default MonthlyBudget;