import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { 
  MessageRight,
  MessageText,
  DateText
} from '../../../../../../components/styles';
import Options from '../Options';

const Request = ({ data }) => {
  const time = data?.createdAt.substring(11, 16);

  return (
    <Options data={data}>
      <MessageRight styles={styles.shadow}>
        <MessageText>{data?.text}</MessageText>
        <DateText>{time}</DateText>
      </MessageRight>
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

Request.propTypes = {
  data: PropTypes.object.isRequired
};

export default Request;