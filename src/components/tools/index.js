import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flag from 'react-native-flags';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from "prop-types";

import { ModalButton, ChatTitle, Status } from '../styles';
import { ThemeContext } from '../theme';

import { us, pt, es, fr, LocaleContext } from '../locale';
import { AuthContext, FirestoreContext } from '../../api/firebase';

export const LogoutButton = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {signOut} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

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
    <TouchableOpacity style={styles.buttonRight} onPress={() =>{
      confirmation()
    }}>
      <Ionicons name="log-out-outline" size={24} color={theme.primary} />
    </TouchableOpacity>
  )
};
LogoutButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export const ChatsMenuButton = ({ navigation }) => {
  const {theme} = useContext(ThemeContext);
  return(
    <TouchableOpacity style={{...styles.buttonLeft, alignItems: 'center'}} onPress={() => navigation.navigate('Chats')}>
      <View style={{height: 3, width: 20, marginBottom: 3, borderRadius: 10, backgroundColor: theme.primary}} />
      <View style={{height: 3, width: 25, borderRadius: 10, backgroundColor: theme.primary}} />
      <View style={{height: 3, width: 20, marginTop: 3, borderRadius: 10, backgroundColor: theme.primary}} />
    </TouchableOpacity>
  )
}

ChatsMenuButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export const ContactsMenuButton = ({ navigation }) => {
  const {theme} = useContext(ThemeContext);
  return(
    <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.navigate('Contacts')}>
      <Ionicons name="people-outline" size={24} color={theme.primary} />
    </TouchableOpacity>
  )
}
ContactsMenuButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export const CloseMenuButton = ({ navigation }) => {
  const {theme} = useContext(ThemeContext);
  return(
    <TouchableOpacity style={{...styles.buttonRight, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.goBack()}>
      <View style={{transform: [{rotate: '45deg'}], height: 3, width: 20, marginBottom: 10, marginRight: 10, borderRadius: 10, backgroundColor: theme.primary}} />
      <View style={{transform: [{rotate: '-45deg'}], height: 3, width: 20, marginTop: -13, marginLeft: -10, borderRadius: 10, backgroundColor: theme.primary}} />
    </TouchableOpacity>
  )
}

CloseMenuButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export const HomeButton = ({ navigation }) => {
  const {theme} = useContext(ThemeContext);
  return(
    <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.navigate('Home')}>
      <Ionicons name="home-outline" size={24} color={theme.primary} />
    </TouchableOpacity>
  )
}
HomeButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};


export const SettingsButton = ({ navigation }) => {
  const {theme} = useContext(ThemeContext);
  return(
    <TouchableOpacity style={styles.buttonRight} onPress={() => navigation.navigate('Settings')}>
      <Ionicons name="settings-sharp" size={24} color={theme.primary} />
    </TouchableOpacity>
  )
}
SettingsButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export const AboutButton = ({ navigation }) => {
  const {theme} = useContext(ThemeContext);
  return(
    <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.navigate('About')}>
      <Ionicons name="information-circle-outline" size={28} color={theme.primary}/>
    </TouchableOpacity>
  )
}
AboutButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export const LanguageSelector = () => {
  // eslint-disable-next-line no-unused-vars
  const {locale, changeLocale} = useContext(LocaleContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [iso, setIso] = useState(locale.language.iso);

  const handleLanguageChange = (iso) => {
    AsyncStorage.setItem('iso', iso);
    setIso(iso);
    setIsMenuOpen(false);
    //changeLocale(iso);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  
  const options = [
    { iso: us.language.iso, name: us.language.name },
    { iso: pt.language.iso, name: pt.language.name},
    { iso: es.language.iso, name: es.language.name},
    { iso: fr.language.iso, name: fr.language.name},
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

export const CloseModal = () => <ModalButton />;

export const MainTitle = () =>{
  const {app} = useContext(FirestoreContext);
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);

  const status = app?.status;

  return(
   <View style={styles.mainMenu}>
      <ChatTitle>{locale.global.app.name}</ChatTitle>
      {status ?
        <View style={styles.statusContainer}>
          <Status style={{color: theme.secondary}}>{locale.global.app.status.true}</Status>
          <Ionicons style={{marginLeft: 3, marginTop: 3}} name="radio" size={13} color={theme.secondary} />
        </View>
      :
        <View style={styles.statusContainer}>
          <Status style={{color: theme.error}}>{locale.global.app.status.false}</Status>
          <Ionicons style={{marginLeft: 3, marginTop: 3}} name="radio" size={13} color={theme.error} />
        </View>
      }
   </View>
  );
}

export const TalkTitle = () =>{
  const {locale} = useContext(LocaleContext);

  return(
   <View style={styles.mainMenu}>
      <ChatTitle>{locale.talk.title}</ChatTitle>
   </View>
  );
}

const styles = StyleSheet.create({
  mainMenu: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -3,
  },
  buttonRight: {
    marginRight: 18
  },
  buttonLeft: {
    marginLeft: 15
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
