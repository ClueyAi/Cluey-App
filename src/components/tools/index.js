import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flag from 'react-native-flags';
import Ionicons from '@expo/vector-icons/Ionicons';

import { us, pt, es, fr, LocaleContext } from '../locale';
import { AuthContext } from '../../api/firebase';

export const LogoutButton = ({ navigation }) => {
  const {signOut} = useContext(AuthContext);

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
    <TouchableOpacity style={styles.button} onPress={() =>{
      confirmation()
    }}>
      <Ionicons name="log-out-outline" size={24} color="#FFBF00" />
    </TouchableOpacity>
  )
}

export const SettingsButton = ({ navigation }) => {
  return(
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
      <Ionicons name="settings" size={24} color="#FFBF00" />
    </TouchableOpacity>
  )
}

export const LanguageSelector = () => {
  const {locale, changeLocale} = useContext(LocaleContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [iso, setIso] = useState(locale.global.language.iso);

  const handleLanguageChange = (iso) => {
    AsyncStorage.setItem('iso', iso);
    setIso(iso);
    setIsMenuOpen(false);
    changeLocale(iso);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  
  const options = [
    { iso: us.global.language.iso, name: us.global.language.name },
    { iso: pt.global.language.iso, name: pt.global.language.name},
    { iso: es.global.language.iso, name: es.global.language.name},
    { iso: fr.global.language.iso, name: fr.global.language.name},
  ];

  const optionsLeft = options.slice(0, 2);
  const optionsRight = options.slice(2);

  return (
    <Menu
      opened={isMenuOpen}
      onBackdropPress={() => setIsMenuOpen(false)}
      onSelect={() => setIsMenuOpen(false)}
    >
      <MenuTrigger >
        <TouchableOpacity style={styles.languageBtn} onPress={toggleMenu}>
          <Text style={styles.languageTxt}>{iso}</Text>
          <Text style={styles.languageTxt}>-</Text>
          <Flag code={iso} size={16}/>
        </TouchableOpacity>
      </MenuTrigger>
      <MenuOptions customStyles={{ optionsContainer: { flex: 1, marginTop: 30, marginRight: 15, borderRadius: 15, width: 220, padding: 10}}} >
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            {optionsLeft.map((option) => (
              <MenuOption
                key={option.iso}
                onSelect={() => handleLanguageChange(option.iso)}
                style={[styles.optionLeft, styles.option]}
              >
                <Flag code={option.iso} size={32}/>
                <Text style={styles.languageTxt}>{option.name}</Text>
              </MenuOption>
            ))}
          </View>
          <View style={{flex: 1}}>
            {optionsRight.map((option) => (
              <MenuOption
                key={option.iso}
                onSelect={() => handleLanguageChange(option.iso)}
                style={[styles.optionRight, styles.option]}
              >
                <Flag code={option.iso} size={32}/>
                <Text style={styles.languageTxt}>{option.name}</Text>
              </MenuOption>
            ))}
          </View>
        </View>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 15
  },
  languageBtn: {
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  languageTxt: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    marginRight: 2,
  },
  optionLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  optionRight: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  optionContainer: {
    flex: 1,
    marginTop: 30,
    marginRight: 15,
    borderRadius: 15,
    width: 200,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    width: 95,
    height: 95,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#00000020',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectOption: {
    borderColor: '#008F00A0',
    backgroundColor: '#00FF0010',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {width: 1, height: 1},
    shadowOpacity:  0.10,
    shadowRadius: 1.51,
    elevation: 6
  }
});

