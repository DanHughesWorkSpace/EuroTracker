import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TextInput, Button, Alert } from 'react-native';
import styles from './styles';
import { Update } from '../../../AppSecondary';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../Core/Config';

import { Picker } from '@react-native-picker/picker';

import moment from 'moment'

import { getUser } from '../../../AppSecondary';

const IncExpButton = (props) => {

    const { content, onPress } = props;

    const borderStyle = content === 'INCOME' ? 'green' : 'red';

    const [modalVisible, setModalVisible] = useState(false);

    const [selectedValue, setSelectedValue] = useState("food");

    const [descriptionInput, setDescriptionInput] = useState();

    const [valueInput, setValueInput] = useState();

    function saveExpenses(category, description, value, type) {
        const userEmail = getUser();
        const date = moment().format("DDMMMYYYY hh:mm:ss a")
        console.log("category", category, description, value, date, content);
        const myDoc = doc(db, "users", userEmail, type , date);
        setDoc(myDoc,{
            "category": category,
            "description": description,
            "value": value
        })
          .then(()=>{
            alert("Update Successful")
            })
            .catch((error)=>{
              alert("Error", error.message)
            })
        setModalVisible(!modalVisible)
    }

    return (
        <View>
            <View style={[styles.btn, { borderColor: borderStyle }]}>
                <Pressable onPress={() => [onPress(), setModalVisible(true)]}>
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
                                <Text>Enter Your Expense </Text>
                            </View>
                            <View style={styles.inputForm}>

                                <View style={styles.firstrow}>
                                    <View>
                                        <Text>Category</Text>
                                        <Picker style={styles.dropdown}
                                            selectedValue={selectedValue}
                                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                            itemStyle={{ height: 40,backgroundColor: "grey", color: "blue", fontSize: 12, padding: 0 }}
                                        >
                                            <Picker.Item label="Food" value="food" />
                                            <Picker.Item label="Transport" value="transport" />
                                            <Picker.Item label="Bills" value="bills" />
                                            <Picker.Item label="Reoccuring" value="reoccuring" />
                                            <Picker.Item label="Other" value="other" />
                                        </Picker>
                                        <Text> {selectedValue}</Text>
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
                                        }} placeholder='E.g. Subway' placeholderTextColor={'grey'} onChangeText={(text) => { setDescriptionInput(text)}} ></TextInput>
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
                                        }} placeholder='E.g. 600' placeholderTextColor={'grey'} onChangeText={(text) => { setValueInput(text)}} ></TextInput>
                                    </View>
                                </View>
                            </View>

                            <Button title="Update Doc" onPress={() => { saveExpenses(selectedValue, descriptionInput, valueInput, content) }}></Button>

                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default IncExpButton;

