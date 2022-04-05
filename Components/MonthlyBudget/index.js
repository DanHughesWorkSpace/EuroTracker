import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import SetMonthlyBudgetModal from './SetMonthlyBudgetModal';
import styles from './styles';


const MonthlyBudget = (props) => {

  const { onPress } = props;

  return (
    <View style={styles.container}>

      <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.image} />

      <Text> Monthly Budget </Text>

      <View>
        <TouchableOpacity onPress={onPress}>
          <Text> Click </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.monthlyBudgetContainer}>
        <View style={styles.monthlyHeader}>
          <Text style={styles.monthlyText}> MARCH BUDGET</Text>
          <SetMonthlyBudgetModal style={styles.budgetIcon}/>
        </View>
        <View style={styles.progressBar}>

        </View>
      </View>
    </View>
  )
}

export default MonthlyBudget;