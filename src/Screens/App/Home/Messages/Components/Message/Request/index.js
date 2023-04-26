import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';

import { UserContext } from '../../../../../../api/firebase';

import { 
  ChatMessages,
  RequestMessages,
  Request,
  ResponseMessages,
  Response,
  NameText,
  MessageText,
  DateText
} from '../../../../../../components/styles';
import MenuDrop from './menuDrop';

const Message = ({ data }) => {
  const {user} = useContext(UserContext);

  if (!data ) {
    return null;
  };
  
  const time = data?.createdAt.substring(11, 16);

  return (
    <ChatMessages>
      <ResponseMessages>
        {data?.userId !== user?.uid ? (
        <MenuDrop data={data}>
            <Response style={styles.shadow}>
              <NameText>{data?.senderName}</NameText>
              <MessageText>{data?.text}</MessageText>
              <DateText>{time}</DateText>
            </Response>
        </MenuDrop>
        ) : null}
      </ResponseMessages>
      <RequestMessages>
        {data?.userId === user?.uid ? (
      <MenuDrop data={data}>
            <Request style={styles.shadow}>
              <MessageText>{data?.text}</MessageText>
              <DateText>{time}</DateText>
            </Request>
        </MenuDrop>
        ) : null}
      </RequestMessages>
    </ChatMessages>
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

export default Message;