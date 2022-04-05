import React, { useState } from 'react';
import { View, Text, Pressable, Modal, SafeAreaView, TextInput, onChangeText } from 'react-native';
import styles from './styles';

const IncExpButton = (props) => {

    const { content, onPress } = props;

    const borderStyle = content === 'INCOME' ? 'green' : 'red';

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <View style={[styles.btn, { borderColor: borderStyle }]}>
                <Pressable onPress={() => [onPress(), setModalVisible(true)]}>
                    {/* <Text> ADD </Text> */}
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
                            <Text style={styles.modalText}>Hello World!</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default IncExpButton;

