import React, { useState, useContext, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BotContext } from '../../../../api/chatbot';
import { UserContext, FirestoreContext } from '../../../../api/firebase';

import { LocaleContext } from '../../../../components/locale';
import { 
  Avoiding,
  ChatTextInput,
  ChatBox,
  Button,
  ChatInput,
} from '../../../../components/styles';

const Chat = () => {
  const {locale} = useContext(LocaleContext);
  const {createAiMessage} = useContext(FirestoreContext);
  const {processeMessage} = useContext(BotContext);
  const {user} = useContext(UserContext);
  const [name, setName] = useState('');
  const [textValue, setTextValue] = useState(null);

  const requestValidation = async (text) => {
    setTextValue(text);
  };

  const handleSend = async () => {
    const message = {
      userId: user?.uid,
      senderName: user?.displayName? user?.displayName : name,
      text: textValue,
      createdAt: new Date().toISOString(),
    };
    setTextValue('');
    if (message.text !== "" && message.userId !== null) {
      try {
        await createAiMessage(message)
        processeMessage(message)
      } catch (error) {
        setTextValue(error.code);
      }
    }
  };

  useEffect(() => {
    if (user) {
      const email = user?.email.split("@")[0];
      const nameFull = user?.displayName? user?.displayName : email;
      setName(nameFull.split(" ")[0]);
    }
  }, [user]);
  return (
    <Avoiding behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={90}>
      <ChatBox>
        <ChatInput style={{...styles.shadowInput, flex: 1}}>
          <ChatTextInput
            style={{fontSize: 15}}
            placeholder={locale.home.chat_box.placeholder1+name+locale.home.chat_box.placeholder2}
            value={textValue}
            placeholderTextColor="#FFBF0090"
            selectionColor="#FFBF00"
            returnKeyType="send"
            enterKeyHint="send"
            blurOnSubmit={false}
            onSubmitEditing={handleSend}
            onChangeText={requestValidation}
          />
          <Button style={{paddingRight: 15}} onPress={handleSend} accessibilityLabel={locale.home.send_button.msg}>
            <Ionicons name="send" size={24} color="#FFBF00" />
          </Button>
        </ChatInput>
      </ChatBox>
    </Avoiding>
  );
};

const styles = StyleSheet.create({
  shadowInput: {
    shadowColor: "#000000",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4
  }
});

export default Chat;