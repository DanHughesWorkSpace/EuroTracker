import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { View, Text, FlatList, Dimensions, TouchableOpacity, Pressable, Modal, TextInput, Button } from 'react-native';
import styles from './styles';
import { db } from '../../../Core/Config';
import { doc, getDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'

import {Update} from '../../../AppSecondary';

import moment from 'moment'
// import auth from '../../firebase';

const SetMonthlyBudgetModal = (props) => {

    // const navigation = useNavigation()
    const { user } = props;
    const [modalVisible, setModalVisible] = useState(false);

    const [text, setText] = useState("");
    // const userEmail = getUser();
    // const month = moment().format("MMM");

    // console.log("user", userEmail )
    function saveMonthlyBudget(budgetFigure) {
        Update({
            "monthlyBudget" : budgetFigure
        })
        setModalVisible(!modalVisible)
    }

   

    return (
        <View style={styles.container}>
            <View style={[styles.btn]}>
                <Pressable onPress={() => [setModalVisible(true)]}>
                    {/* <Text> ADD </Text> */}
                    <Text > T </Text>
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
                        <Button title="close" onPress={() => {setModalVisible(!modalVisible)}}></Button>
                            <Text>Enter Your Monthly Budget</Text>
                            <TextInput style={{
                                // width: '100%',
                                fontSize: 14,
                                borderColor: 'grey',
                                borderWidth: 2,
                                padding: 2,
                                marginVertical: 10
                            }} placeholder='E.g 600' placeholderTextColor={'grey'} onChangeText={(text) => { setText(text) }} value={text}></TextInput>
                            <Button title="Update Doc" onPress={() => { saveMonthlyBudget(text) }} disabled={text == ""}></Button>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default SetMonthlyBudgetModal;