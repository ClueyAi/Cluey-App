import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PropTypes from "prop-types";

import { ThemeContext, shadow } from '../../../../components/theme';
import {
  View,
  ButtonEmpyte,
  Input,
  TextInput,
} from "../../../../components/styles";

const New = ({ putContact }) => {
  const chatContainerRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const [addContact, setAddContact] = useState(false);
  const [contactEmail, setContactEmail] = useState('');

  const handleContainerPress = () => {
    Keyboard.dismiss();
    handlerAddContact();
  };

  const handlerAddContact = () => {
    if (addContact) {
      setAddContact(false);
    } else {
      setAddContact(true);
    }
  };

  const handlerChatName = (text) => {
    setContactEmail(text);
  };

  const handleAddNewContact = async () => {
    try {
      handlerAddContact()
      await putContact(contactEmail);
      setContactEmail('');
    } catch (error) {
      console.error(error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    button: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: '95%',
      height: 48,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 20,
      backgroundColor: theme.background, 
      borderWidth: 0.1,
      borderColor: theme.background,
    },
    input: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: '95%',
      height: 48,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 20,
      borderWidth: 0,
      backgroundColor: theme.background, 
    },
    chatBox: {
      width: '100%',
    }
  });

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <View style={styles.container} ref={chatContainerRef}>
        { !addContact ?
          <ButtonEmpyte style={{...shadow, backgroundColor: theme.background, borderRadius: 30, margin: 10}} onPress={handlerAddContact}>
            <MaterialIcons style={{alignSelf: 'center', padding: 2, margin: 5, zIndex: 1, borderRadius: 100}} name="add" size={22} color={theme.text} />
          </ButtonEmpyte>
        :
        <View style={{ ...styles.chatBox}}>
          <ButtonEmpyte style={{position: 'absolute', alignSelf: 'center', top: -10, padding: 2, zIndex: 1, borderRadius: 100, backgroundColor: theme.background}} onPress={handlerAddContact}>
            <MaterialIcons name="cancel" size={20} color={theme.error} />
          </ButtonEmpyte>
          <Input style={{...shadow, ...styles.input}}>
            <TextInput
              placeholder="New contact"
              placeholderTextColor={theme.text}
              value={contactEmail}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              inputMode="email"
              autoComplete="email"
              maxLength={100}
              returnKeyType="send"
              onChangeText={handlerChatName}
              onSubmitEditing={handleAddNewContact}
            />
            <ButtonEmpyte onPress={handleAddNewContact}>
              <MaterialIcons style={{marginRight: 15}} name="check" size={24} color={theme.secondary} />
            </ButtonEmpyte>
          </Input>
        </View>
        }
    </View>
  </TouchableWithoutFeedback>
  );
};

New.propTypes = {
  putContact: PropTypes.func.isRequired
};

export default New;