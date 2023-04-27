import React from 'react';
import { StyleSheet } from 'react-native';

import { 
  MessageLeft,
  NameText,
  MessageText,
  DateText
} from '../../../../../../components/styles';
import Options from '../Options';

const Response = ({ data }) => {
  const time = data?.createdAt.substring(11, 16);

  return (
    <Options style={styles.menu} data={data}>
      <MessageLeft>
        <NameText>{data?.senderName}</NameText>
        <MessageText>{data?.text}</MessageText>
        <DateText>{time}</DateText>
      </MessageLeft>
    </Options>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 50,
    backgroundColor: '#',
  },
});

export default Response;