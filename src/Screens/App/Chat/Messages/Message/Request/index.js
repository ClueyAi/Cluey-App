import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { 
  MessageRight,
  MessageText,
  DateText
} from '../../../../../../components/styles';
import Menu from './Menu';

const Request = ({ data }) => {
  const time = data?.createdAt.substring(11, 16);

  return (
    <Menu data={data}>
    <MessageRight style={styles.shadow}>
      <MessageText>{data?.text}</MessageText>
      <DateText>{time}</DateText>
    </MessageRight>
    </Menu>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {width: 1, height: 2},
    shadowOpacity:  0.17,
    shadowRadius: 2.05,
    elevation: 4
  }
});

Request.propTypes = {
  data: PropTypes.object.isRequired
};

export default Request;