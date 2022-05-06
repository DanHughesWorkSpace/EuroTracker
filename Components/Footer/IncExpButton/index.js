import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, TextInput, Button, Alert } from 'react-native';
import styles from './styles';
import { Update } from '../../../AppSecondary';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../Core/Config';

import { Picker } from '@react-native-picker/picker';

import moment from 'moment'

import { getUser } from '../../../AppSecondary';

const IncExpButton = (props) => {

    // code now updates a field in DB called "totalExpenses" in Document "TotalMonthlyExpenses" to keep track of SUM of expenses for that month
    // need to pull new totalExpenses figure
        // esnure it updates automatically

    const { content } = props;

    const IncomeDataset = [
        "Salary", "Side Hussle", 'Asset Sales'
    ]

    const ExpenseDataset = [
        "Food", "Transport", "Bills", "Reoccuring", "other"
    ]

    const [data, setdata] = useState(ExpenseDataset)

    const borderStyle = content === 'INCOME' ? 'green' : 'red';

    const [modalVisible, setModalVisible] = useState(false);

    const [selectedValue, setSelectedValue] = useState(0);

    const [descriptionInput, setDescriptionInput] = useState();

    const [valueInput, setValueInput] = useState();

    const [selectedModal, setSelectedModal] = useState();

    const [previouslySavedTotalExpenses, setPreviouslySavedTotalExpenses] = useState();

    const userEmail = getUser()
    const month = moment().format("MMM");

    useEffect(() => {
        getUserMonthlyExpenseValue();
    }, [])

    function checkModalType(type) {
        if (type === "INCOME") {
            setdata(IncomeDataset)
        } else {
            setdata(ExpenseDataset)
        }
    }

    function getUserMonthlyExpenseValue() {
        const myDoc = doc(db, "users", userEmail, month, "totalMonthlyExpenses");
        getDoc(myDoc)
            .then((snapshot) => {
                if (snapshot.exists) {
                    setPreviouslySavedTotalExpenses(Number(snapshot.data().totalExpenses))
                }
                else {
                    alert("No doc found")
                }
            })
            .catch((error) => {
                console.log("Error", error.message)
            })
    }

    function updateTotalExpensesValue(newValue) {
        let updatedValue = previouslySavedTotalExpenses;

        updatedValue += Number(newValue)

        const totalExpensesDocument = doc(db, "users", userEmail, month, "totalMonthlyExpenses");

        setDoc(totalExpensesDocument, {
            "totalExpenses": updatedValue,
        })
    }

    function saveExpenses(category, description, value) {
        const item = data[category]

        const date = moment().format("DDMMMYYYY");
        const timestamp = moment().format("hh:mm:ss a");
        const myDoc = doc(db, "users", userEmail, month, date, content, timestamp);
        setDoc(myDoc, {
            "category": item,
            "description": description,
            "value": value,
        })
            .then(() => {
                alert("Update Successful")
            })
            .catch((error) => {
                alert("Error", error.message)
            })
        setModalVisible(!modalVisible);
        updateTotalExpensesValue(value)
    }
    return (
        <View>
            <View style={[styles.btn, { borderColor: borderStyle }]}>
                <Pressable onPress={() => [setModalVisible(true), checkModalType(content)]}>
                    <Text > {content} </Text>
                </Pressable>
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Button title="close" onPress={() => { setModalVisible(!modalVisible) }}></Button>
                            <View>
                                <Text>ENTER YOUR {content} </Text>
                            </View>
                            <View style={styles.inputForm}>

                                <View style={styles.firstrow}>
                                    <View>
                                        <Text>Category</Text>
                                        <Picker style={styles.dropdown}
                                            selectedValue={selectedValue}
                                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemIndex)}
                                            itemStyle={{ height: 40, backgroundColor: "grey", color: "blue", fontSize: 12, padding: 0 }}
                                        >
                                            {data.map((item, index) => {
                                                return (<Picker.Item label={item} value={index} key={index} />)
                                            })}
                                        </Picker>
                                    </View>
                                </View>
                                <View style={styles.secondrow}>
                                    <View>
                                        <Text>Description</Text>
                                        <TextInput style={{
                                            // width: '100%',
                                            fontSize: 14,
                                            borderColor: 'grey',
                                            borderWidth: 2,
                                            padding: 2,
                                            marginVertical: 10
                                        }} placeholder='E.g. Subway' placeholderTextColor={'grey'} onChangeText={(text) => { setDescriptionInput(text) }} ></TextInput>
                                    </View>
                                    <View>
                                        <Text>Value</Text>
                                        <TextInput style={{
                                            // width: '100%',
                                            fontSize: 14,
                                            borderColor: 'grey',
                                            borderWidth: 2,
                                            padding: 2,
                                            marginVertical: 10
                                        }} placeholder='E.g. 600' placeholderTextColor={'grey'} onChangeText={(text) => { setValueInput(text) }} ></TextInput>
                                    </View>
                                </View>
                            </View>

                            <Button title="Update Doc" onPress={() => { saveExpenses(selectedValue, descriptionInput, valueInput) }}></Button>

                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default IncExpButton;

