import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { View, Text, FlatList, Dimensions, TouchableOpacity, Pressable, Modal, TextInput, Button } from 'react-native';
import styles from './styles';
// import auth from '../../firebase';

const SetMonthlyBudgetModal = (props) => {

    // const navigation = useNavigation()

    const [modalVisible, setModalVisible] = useState(false);

    // const { onPress } = props;

    return (
        <View style={styles.container}>
            <View style={[styles.btn]}>
                <Pressable onPress={() => [console.log("yes"), setModalVisible(true)]}>
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
                            {/* <Text style={styles.modalText}>Hello World!</Text> */}
                            <TextInput style={{
                                // width: '100%',
                                fontSize: 14,
                                borderColor: 'grey',
                                borderWidth: 2,
                                padding: 2,
                                marginVertical: 10
                            }} placeholder='Type Here...' placeholderTextColor={'grey'}></TextInput>
                            <Text>Enter Your Monthly Budget</Text>
                           <View style={styles.confirmButton} >
                           <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Confirm Changes</Text>
                            </Pressable>
                           </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default SetMonthlyBudgetModal;