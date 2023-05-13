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

const New = ({ createChat }) => {
  const { theme } = useContext(ThemeContext);
  const [creatingChat, setCreatingChat] = useState(false);
  const [chatName, setChatName] = useState('');

  const handlerCreatringChat = () => {
    if (creatingChat) {
      setCreatingChat(false);
    } else {
      setCreatingChat(true);
    }
  };

  const handlerChatName = (text) => {
    setChatName(text);
  };

  const handleAddNewChat = async () => {
  try {
    const timestamp = Date().toLocaleString();
    const chat = {
      name: chatName,
      createdAt: timestamp,
      text: '',
    };
    handlerCreatringChat()
    await createChat(chat);
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
      { !creatingChat ?
        <ButtonEmpyte style={{...styles.shadow, ...styles.button}} onPress={handlerCreatringChat}>
          <MaterialIcons style={{position: 'absolute', alignSelf: 'center', top: -15, padding: 2, zIndex: 1, borderRadius: 100, backgroundColor: theme.backgroundSecondary}} name="add" size={22} color={theme.text} />
          <H3Bold style={{color: theme.text}}>New chat</H3Bold>
        </ButtonEmpyte>
      :
      <View style={{ ...styles.chatBox}}>
        <ButtonEmpyte style={{position: 'absolute', alignSelf: 'center', top: -10, padding: 2, zIndex: 1, borderRadius: 100, backgroundColor: theme.backgroundSecondary}} onPress={handlerCreatringChat}>
          <MaterialIcons name="clear" size={20} color={theme.error} />
        </ButtonEmpyte>
        <Input style={{...styles.shadow, ...styles.input}}>
          <TextInput
            placeholder="New chat"
            placeholderTextColor={theme.text}
            value={chatName}
            autoCapitalize="characters"
            autoFocus={true}
            inputMode="text"
            maxLength={20}
            returnKeyType="send"
            onChangeText={handlerChatName}
            onSubmitEditing={handleAddNewChat}
          />
          <ButtonEmpyte onPress={handleAddNewChat}>
            <MaterialIcons style={{marginRight: 25}} name="check" size={24} color={theme.secondary} />
          </ButtonEmpyte>
        </Input>
      </View>
      }
  </View>
  );
};

New.propTypes = {
  createChat: PropTypes.func.isRequired
};

export default New;