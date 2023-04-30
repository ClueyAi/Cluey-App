import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

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
      <MessageLeft style={styles.shadow}>
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
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 6
  }
});

Response.propTypes = {
  data: PropTypes.object.isRequired
};

export default Response;