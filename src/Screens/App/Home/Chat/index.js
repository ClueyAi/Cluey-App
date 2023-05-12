import React, { useState, useContext, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { OpenAIContext } from '../../../../api/openai';
import { UserContext, FirestoreContext } from '../../../../api/firebase';
import { ThemeContext } from '../../../../components/theme';
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
  const {theme} = useContext(ThemeContext);
  const {createUserMessage} = useContext(FirestoreContext);
  const {checkOpenAIStatus, sendMessageToOpenAI} = useContext(OpenAIContext);
  const {user} = useContext(UserContext);
  const [name, setName] = useState('');
  const [textValue, setTextValue] = useState(null);

  const requestValidation = async (text) => {
    setTextValue(text);
  };

  const handleSend = async () => {
    const message = {
      contextName: "Default",
      text: textValue,
      createdAt: new Date().toISOString(),
    };
    setTextValue('');
    if (message.text !== "" && message.userId !== null) {
      try {
        await createUserMessage(message)
        await sendMessageToOpenAI(message)
      } catch (error) {
        setTextValue(error.code);
      }
    }
  };

  const handleSpeech = async () => {
    alert("Fale!");
    checkOpenAIStatus();
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
      <ChatBox style={Platform.OS === "ios" ? {paddingBottom: '8%'} : {paddingBottom: '5%'}}>
        <ChatInput style={{...styles.shadow, flex: 1}}>
          <ChatTextInput
            style={{fontSize: 15}}
            placeholder={locale.home.chat_box.placeholder1+name+locale.home.chat_box.placeholder2}
            value={textValue}
            multiline={true}
            minHeight={50}
            placeholderTextColor={theme.primary}
            selectionColor={theme.primary}
            blurOnSubmit={false}
            onChangeText={requestValidation}
          />
          {textValue === "" || textValue == null ?
            <Button style={{paddingRight: 15}} onPress={handleSpeech} accessibilityLabel={locale.home.send_button.accessibility}>
              <Ionicons name="mic" size={28} color={theme.primary} />
            </Button>
          :
            <Button style={{paddingRight: 15}} onPress={handleSend} accessibilityLabel={locale.home.send_button.accessibility}>
              <Ionicons name="send" size={24} color={theme.primary} />
            </Button>
          }
        </ChatInput>
      </ChatBox>
    </Avoiding>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4
  }
});

export default Chat;