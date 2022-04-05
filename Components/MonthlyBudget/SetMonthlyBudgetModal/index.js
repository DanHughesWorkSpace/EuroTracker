import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { View, Text, FlatList, Dimensions, TouchableOpacity, Pressable, Modal, TextInput, Button } from 'react-native';
import styles from './styles';
import { db } from '../../../Core/Config';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'

// import auth from '../../firebase';

const SetMonthlyBudgetModal = (props) => {

    // const navigation = useNavigation()

    const [modalVisible, setModalVisible] = useState(false);

    const [text, setText] = useState("");


    // const { onPress } = props;
    const Create = () => {
        const myDoc = doc(db, "users", "testuser3@gmail.com");

        const docData = {
            "monthlyBudget": 600,
        }

        setDoc(myDoc, docData).then(() => {
            alert("Dcoument Created")
        })
            .catch((error) => {
                alert("Error", error.message)
            })
    }

    const Update = (value, merge) => {
        const myDoc = doc(db, "users", "testuser3@gmail.com");

        setDoc(myDoc, value, { merge: merge })
            .then(() => {
                alert("Update Successful")
            })
            .catch((error) => {
                alert("Error", error.message)
            })
        setModalVisible(!modalVisible)
    }


    return (
        <View style={styles.container}>
            <View style={[styles.btn]}>
                <Pressable onPress={() => [console.log("yes"), setModalVisible(true)]}>
                    {/* <Text> ADD </Text> */}
                    <Text > T </Text>
                </Pressable>
            </View>
            <View style={styles.centeredView}>
                {/* <Modal
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
                            <Text>Enter Your Monthly Budget</Text>
                            <TextInput style={{
                                // width: '100%',
                                fontSize: 14,
                                borderColor: 'grey',
                                borderWidth: 2,
                                padding: 2,
                                marginVertical: 10
                            }} placeholder='E.g 600' placeholderTextColor={'grey'} onChangeText={(text)=>{setText(text)}} value={text}></TextInput>
                            
                           <View style={styles.confirmButton} >
                           <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={[() => setModalVisible(!modalVisible)]}
                            >
                                <Text style={styles.textStyle}>Confirm Changes</Text>
                            </Pressable>
                           </View>
                        </View>
                    </View>
                </Modal> */}
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
                            <Text>Enter Your Monthly Budget</Text>
                            <TextInput style={{
                                // width: '100%',
                                fontSize: 14,
                                borderColor: 'grey',
                                borderWidth: 2,
                                padding: 2,
                                marginVertical: 10
                            }} placeholder='E.g 600' placeholderTextColor={'grey'} onChangeText={(text) => { setText(text) }} value={text}></TextInput>
                            <Button title="Update Doc" onPress={() => {
                                Update({
                                    "monthlyBudget": text
                                })
                            }} disabled={text == ""}></Button>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default SetMonthlyBudgetModal;