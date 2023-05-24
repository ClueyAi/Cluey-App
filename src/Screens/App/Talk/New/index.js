import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from "prop-types";

import { FirestoreContext } from '../../../../api/firebase';
import { ThemeContext, shadow } from '../../../../components/theme';
import { LocaleContext } from '../../../../components/locale';
import { 
  Avoiding,
  ChatTextInput,
  ChatBox,
  Button,
  ChatInput,
} from '../../../../components/styles';

const New = ({talkId}) => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const {createUserWhisp} = useContext(FirestoreContext);
  const [textValue, setTextValue] = useState(null);

  const requestValidation = async (text) => {
    setTextValue(text);
  };

  const handleSend = async () => { 
    setTextValue('');
    if (textValue.text !== "") {
      try {
        await createUserWhisp(talkId, textValue);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSpeech = async () => {
    alert("Fale!");

  };

  return (
    <Avoiding behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={90}>
      <ChatBox style={Platform.OS === "ios" ? {paddingBottom: '8%'} : {paddingBottom: '5%'}}>
        <ChatInput style={{...shadow, flex: 1}}>
          <ChatTextInput
            style={{fontSize: 15}}
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

New.propTypes = {
  talkId: PropTypes.string.isRequired
};

export default New;