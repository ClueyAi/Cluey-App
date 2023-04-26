import React from 'react';
import { StyleSheet } from 'react-native';

import { 
  Response,
  NameText,
  MessageText,
  DateText
} from '../../../../../../components/styles';
import Options from '../Options';

const Send = ({ data }) => {
  const time = data?.createdAt.substring(11, 16);

  return (
    <Options style={styles.menu} data={data}>
      <Response>
        <NameText>{data?.senderName}</NameText>
        <MessageText>{data?.text}</MessageText>
        <DateText>{time}</DateText>
      </Response>
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

export default Send;