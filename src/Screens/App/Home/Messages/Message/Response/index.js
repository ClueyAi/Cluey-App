import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { 
  MessageLeft,
  NameText,
  MessageText,
  DateText
} from '../../../../../../components/styles';
import Menu from './Menu';

const Response = ({ data }) => {
  const time = data?.createdAt.substring(11, 16);

  return (
    <Menu data={data}>
    <MessageLeft style={styles.shadow}>
      <NameText>{data?.senderName}</NameText>
      <MessageText>{data?.text}</MessageText>
      <DateText>{time}</DateText>
    </MessageLeft>
    </Menu>
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

Response.propTypes = {
  data: PropTypes.object.isRequired
};

export default Response;