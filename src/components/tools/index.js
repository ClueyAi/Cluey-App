import React, {useContext} from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import locale from '../locale'

import { AuthContext } from '../../api/firebase';

export const LogoutButton = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  const confirmation = () => {
    return Alert.alert(
      locale.alert.logout.title,
      locale.alert.logout.message,
      [
        {
          text: locale.alert.yes,
          onPress: async () => {
            try {
              await signOut();
              navigation.navigate('Loading');
            } catch (error) {
              Alert.alert(error.message)
            }
          },
        },
        {
          text: locale.alert.no,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={{marginRight: 15}} onPress={() =>{
      confirmation()
    }}>
      <Ionicons name="log-out-outline" size={24} color="#FFBF00" />
    </TouchableOpacity>
  )
}

export const SettingsButton = ({ navigation } ) => {
  return(
    <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.navigate('Settings')}>
      <Ionicons name="settings-outline" size={24} color="#FFBF00" />
    </TouchableOpacity>
  )
}

export const LanguageButton = ({ navigation } ) => {
  return(
    <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.navigate('Settings')}>
      <Ionicons name="settings-outline" size={24} color="#FFBF00" />
    </TouchableOpacity>
  )
}