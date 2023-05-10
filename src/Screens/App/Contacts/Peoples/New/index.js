import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PropTypes from "prop-types";

import { ThemeContext } from '../../../../../components/theme';
import {
  View,
  ButtonEmpyte,
  Input,
  TextInput,
  H3Bold
} from "../../../../../components/styles";

const New = ({ putContact }) => {
  const { theme } = useContext(ThemeContext);
  const [addContact, setAddContact] = useState(false);
  const [contactEmail, setContactEmail] = useState('');

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
      backgroundColor: theme.backgroundSecondary, 
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
      backgroundColor: theme.backgroundSecondary, 
      borderWidth: 0.1,
      borderColor: theme.background,
    },
    chatBox: {
      width: '100%',

    },
    shadow: {
      shadowColor: "#000000",
      shadowOffset: {width: 0, height: 3},
      shadowOpacity:  0.17,
      shadowRadius: 3.05,
      elevation: 4
    }
  });

  return (
    <View style={styles.container}>
      { !addContact ?
        <ButtonEmpyte style={{...styles.shadow, ...styles.button}} onPress={handlerAddContact}>
          <MaterialIcons style={{position: 'absolute', alignSelf: 'center', top: -15, padding: 2, zIndex: 1, borderRadius: 100, backgroundColor: theme.backgroundSecondary}} name="add" size={22} color={theme.text} />
          <H3Bold style={{color: theme.text}}>New contact</H3Bold>
        </ButtonEmpyte>
      :
      <View style={{ ...styles.chatBox}}>
        <ButtonEmpyte style={{position: 'absolute', alignSelf: 'center', top: -10, padding: 2, zIndex: 1, borderRadius: 100, backgroundColor: theme.backgroundSecondary}} onPress={handlerAddContact}>
          <MaterialIcons name="clear" size={20} color={theme.error} />
        </ButtonEmpyte>
        <Input style={{...styles.shadow, ...styles.input}}>
          <TextInput
            placeholder="New contact"
            placeholderTextColor={theme.text}
            value={contactEmail}
            autoCapitalize="none"
            autoFocus={true}
            maxLength={20}
            returnKeyType="send"
            onChangeText={handlerChatName}
            onSubmitEditing={handleAddNewContact}
          />
    
          <ButtonEmpyte onPress={handleAddNewContact}>
            <MaterialIcons style={{marginRight: 25}} name="check" size={24} color={theme.secondary} />
          </ButtonEmpyte>
        </Input>
      </View>
      }
  </View>
  );
};

New.propTypes = {
  putContact: PropTypes.func.isRequired
};

export default New;