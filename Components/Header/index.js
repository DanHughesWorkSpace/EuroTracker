import React from 'react';
import { useNavigation } from '@react-navigation/core'
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import styles from './styles';
import auth from '../../Core/Config';

const Header = (props) => {

  const navigation = useNavigation()

  const { onPress } = props;
  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.replace("Login")
  //     })
  //     .catch(error => alert(error.message))
  // }

  return (
    <View style={styles.container}>
      <View><Text>Test Title</Text></View>
      <View>
        <TouchableOpacity
          onPress={onPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header;