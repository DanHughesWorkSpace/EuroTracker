import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';
import IncExpButton from './IncExpButton';

const FooterButtons = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.btnContainer}>
                <IncExpButton content={"INCOME"} />

                <IncExpButton content={"EXPENSE"} />
            </View>
        </View>
    )
}

export default FooterButtons;